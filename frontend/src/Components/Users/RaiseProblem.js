import React, { useEffect, useState } from "react";
import { Button, Input,Upload,Form,DatePicker,TimePicker,message } from "antd";
import { addproblem } from "../../store/api";
import 'antd/dist/antd.css';
export default function RaiseProblem() {
  const dateFormat = 'YYYY-MM-DD';
  const [form]=Form.useForm();
  const [fileList, setFileList] = useState("");
  const beforeUpload = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileList(reader.result);
      };
    } else {
      setFileList("");
    }
    return false;
  }
  const onFinish = async (values) => {
    if(fileList===""){
      message.warning("Please Upload Images");
      return;
    }
    let date = new Date();
    let res = await addproblem({
      title:values.title,
      description:values.description,
      postedby: sessionStorage.getItem("name"),
      createddate:
        date.toLocaleString("en-us", { month: "short" }) +
        " " +
        date.getDay() +
        ", " +
        date.getHours() +
        ":" +
        date.getMinutes(),
      time:values.time.format("h:mm:ss a"),
      date:values.date.format(dateFormat),
      location:values.location,
      attachment: fileList
    });
    if (res) {
      message.info("Problem Created Successfully", 3);
      window.location.reload();
    }
  };
  return (
    <div>
      <span
        style={{ margin: "0px 20px", fontWeight: "bold", fontSize: "20px" }}
      >
        Raise Problem
      </span>
      <br />
      <div style={{marginLeft:"20%"}}>
      <Form
       form={form}
       name="basic"
       onFinish={onFinish}
       layout="vertical"
       style={{width:"500px"}}
      >
        <Form.Item>
         <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          maxCount={1}
          >
           {fileList.length >= 1 ? null : "Upload"}
        </Upload>
        </Form.Item>
        <Form.Item
          label="Type of Issue"
          name="title"
          rules={[{ required: true, message: 'Red' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Problem Info"
          name="description"
          rules={[{ required: true, message: 'Red' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Red' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Select Date"
          name="date"
          rules={[{ required: true, message: 'Red' }]}
        >
          <DatePicker format={dateFormat}/>
        </Form.Item>
        <Form.Item
          label="Select Time"
          name="time"
          rules={[{ required: true, message: 'Red' }]}
        >
          <TimePicker format={"h:mm:ss a"}/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
      </Form>
    </div>
    </div>
  );
}