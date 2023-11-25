import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Space,
  Form,
  Divider,
  Upload,
  notification,
  Select,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [processing, setProcessing] = useState(false);
  const message = {
    success: "Job Submitted Successfully",
    error: "Error in submitting job, please try again",
  };
  const navigate = useNavigate();

  const vms = process.env.REACT_APP_BACKEND_URLS.split(",")
    .filter((vm) => vm)
    .reduce((curr, obj) => {
      curr[obj.split("-")[0]] = obj.split("-")[1];
      return curr;
    }, {});

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type) => {
    api[type]({
      message: message[type],
      placement: "topRight",
    });
  };

  const submitData = async (data) => {
    setProcessing(true);

    try {
      const zip = new JSZip();
      for (let c = 0; c < data.count; c++) {
        let folder = zip.folder(data[`sim_${c}_name`]);
        data[`sim_${c}_files`].fileList.forEach((f) =>
          folder.file(f.name, f.originFileObj)
        );
      }
      const content = await zip.generateAsync({ type: "blob" });
      const zipFile = new File([content], data.name, {
        type: "application/zip",
      });

      const formData = new FormData();
      formData.append("zipFile", zipFile);

      await fetch(`${vms[data.vm]}/postjob`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      openNotification("success");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      openNotification("error");
    } finally {
      setProcessing(false);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUpload = () => false;

  return (
    <div style={{ color: "#fff" }}>
      {contextHolder}
      <Typography variant="h2" component="h2" align="center" m={5}>
        Add Project
      </Typography>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={submitData}
        autoComplete="off"
        style={{ color: "#fff" }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input id="name" type="text" placeholder="Enter Project Name" />
          </Form.Item>
          <Form.Item
            label="Sim Count"
            name="count"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="number" placeholder="Simulations Count" />
          </Form.Item>
          <Form.Item
            label="Select VM"
            name="vm"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              placeholder="Virtual Machine"
              options={Object.keys(vms).map((vm) => ({ label: vm, value: vm }))}
            />
          </Form.Item>
        </Space>
        <Divider></Divider>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.count !== currentValues.count
          }
          noStyle
        >
          {({ getFieldValue }) =>
            Array.from({ length: getFieldValue("count") ?? 0 }).map(
              (_, idx) => (
                <Space
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Form.Item
                    label={`Sim ${idx + 1} Name`}
                    name={`sim_${idx}_name`}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter Simulation Name"
                    />
                  </Form.Item>
                  <Form.Item
                    name={`sim_${idx}_files`}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Upload
                      name="logo"
                      customRequest={dummyRequest}
                      beforeUpload={beforeUpload}
                      listType="picture"
                      multiple
                    >
                      <Button
                        variant="contained"
                        component="span"
                        disabled={processing}
                      >
                        Select Simulation Files
                      </Button>
                    </Upload>
                  </Form.Item>
                </Space>
              )
            )
          }
        </Form.Item>
        <Divider />
        <Form.Item
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.name !== currentValues.name ||
            prevValues.count !== currentValues.count
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("count") &&
            getFieldValue("name") && (
              <Button
                type="primary"
                htmlType="submit"
                disabled={processing}
                style={{ margin: "auto" }}
              >
                {processing && (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                )}
                Submit
              </Button>
            )
          }
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProject;
