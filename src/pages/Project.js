import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import FileOutlined from "@ant-design/icons/FileOutlined";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import {
  Typography,
  Button,
  Divider,
  Space,
  Flex,
  Row,
  Col,
  Image,
} from "antd";

const Project = () => {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [data, setData] = useState({});
  const { uid } = useParams();

  useEffect(() => {
    async function fetchInputs() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getjob/${uid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const jobData = (
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/getjobs`, {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json())
        ).filter((a) => a.uid === uid)[0];
        setData(jobData);

        const blob = await response.blob();
        const zip = new JSZip();
        const zipData = await zip.loadAsync(blob);

        const inputs = {};
        const promises = [];
        zipData.forEach(async (relPath, file) => {
          const simName = relPath.split("/").slice(-2, -1)[0];

          promises.push(
            new Promise(async (resolve, reject) => {
              try {
                const extractedData = await file.async("blob");
                const f = new File(
                  [extractedData],
                  relPath.split("/").slice(-1)[0],
                  {
                    type: blob.type,
                  }
                );

                if (
                  f.name &&
                  ["pot", "mistdata", "cif", ""].includes(f.name.split(".")[1])
                ) {
                  if (simName in inputs) {
                    inputs[simName] = [...inputs[simName], f];
                  } else {
                    inputs[simName] = [f];
                  }
                }
                resolve();
              } catch (err) {
                reject(err);
              }
            })
          );
        });

        await Promise.all(promises);
        setInputs(inputs);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchResults() {
      try {
        const blob = fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getresult/${uid}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-cache",
          }
        ).then((res) => res.blob());

        const zip = new JSZip();
        const zipData = await zip.loadAsync(blob);

        const results = {};
        const promises = [];
        zipData.forEach(async (relPath, file) => {
          promises.push(
            new Promise(async (resolve, reject) => {
              try {
                const extractedData = await file.async("blob");
                const f = new File(
                  [extractedData],
                  relPath.split("/").slice(-1)[0],
                  {
                    type: blob.type,
                  }
                );
                const simName = relPath.split("/").slice(-2, -1)[0];

                if (simName in results) {
                  results[simName] = [...results[simName], f];
                } else {
                  results[simName] = [f];
                }
                resolve();
              } catch (err) {
                reject(err);
              }
            })
          );
        });

        await Promise.all(promises);
        setResults(results);
      } catch (err) {
        console.error(err);
      }
    }

    fetchInputs();
    fetchResults();
  }, [uid]);

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };

  const downloadZip = async (files, simName, type) => {
    try {
      const zip = new JSZip();
      let folder = zip.folder(simName);
      files.forEach((f) => folder.file(f.name, f.originFileObj));
      const content = await zip.generateAsync({ type: "blob" });
      const zipFile = new File(
        [content],
        type === "result"
          ? `${data.filename.split(".")[0]}_${simName}_results.zip`
          : `${data.filename.split(".")[0]}_${simName}_inputs.zip`,
        {
          type: "application/zip",
        }
      );
      downloadFile(zipFile);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInputs = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getjob/${uid}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.blob())
      .then((blob) =>
        downloadFile(
          new File([blob], `${data.filename.split(".")[0]}_inputs.zip`, {
            type: "application/zip",
          })
        )
      );
  };

  const downloadResults = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getresult/${uid}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.blob())
      .then((blob) =>
        downloadFile(
          new File([blob], `${data.filename.split(".")[0]}_results.zip`, {
            type: "application/zip",
          })
        )
      );
  };

  const getSrc = (arr) => {
    return arr
      ? arr
          ?.filter((a) => a.name.includes(".jpg"))
          .map((a) => URL.createObjectURL(a))
      : [];
  };

  return (
    <div style={{ padding: "0 5%" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Project Name: {data?.filename?.split(".")[0]}
      </Typography.Title>
      <Space direction="vertical">
        <Space size="middle">
          <Typography.Title level={4}>
            Simulation Count: {data?.processes?.length}
          </Typography.Title>
          <Typography.Title level={4}>Status: {data?.status}</Typography.Title>
          <Typography.Title level={4}>
            Submitted At: {data?.submitted_at}
          </Typography.Title>
        </Space>
        <Space size="large">
          <Button
            type="default"
            icon={<DownloadOutlined />}
            size="large"
            onClick={downloadInputs}
          >
            Download All Inputs
          </Button>
          <Button
            type="default"
            icon={<DownloadOutlined />}
            size="large"
            onClick={downloadResults}
          >
            Download All Results
          </Button>
        </Space>
      </Space>
      <Divider />
      {Object.keys(inputs)?.map((simName) => (
        <div key={simName}>
          <Flex justify="space-between" align="start">
            <div>
              <Typography.Title level={4}>
                Simulation Name: {simName}
              </Typography.Title>

              <Typography.Title level={4} style={{ marginBottom: "25px" }}>
                Simulation Files:{" "}
                <Button
                  type="default"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="medium"
                  style={{ marginLeft: "20px" }}
                  onClick={() => downloadZip(inputs[simName], simName, "input")}
                >
                  Download
                </Button>
              </Typography.Title>
              {inputs[simName]?.map((file) => (
                <Button
                  type="dashed"
                  onClick={() => downloadFile(file)}
                  size="large"
                  color="primary"
                >
                  <FileOutlined />
                  <span>{file.name}</span>
                </Button>
              ))}
              {data.status === "Completed" && (
                <Typography.Title level={4} style={{ marginBottom: "25px" }}>
                  Simulation Results:{" "}
                  <Button
                    type="default"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size="medium"
                    style={{ marginLeft: "20px" }}
                    onClick={() =>
                      downloadZip(results[simName], simName, "result")
                    }
                  >
                    Download
                  </Button>
                </Typography.Title>
              )}
              {results[simName]?.map((file) => (
                <Button
                  type="dashed"
                  onClick={() => downloadFile(file)}
                  size="large"
                  color="primary"
                >
                  <FileOutlined />
                  <span>{file.name}</span>
                </Button>
              ))}
            </div>
            {data.status === "Completed" && (
              <Row>
                {getSrc(results[simName]).map((url) => (
                  <Col span={12}>
                    <Image
                      style={{
                        width: "100%",
                        marginLeft: "5%",
                        maxWidth: "500px",
                      }}
                      src={url}
                      alt="figure"
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Flex>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Project;
