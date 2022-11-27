import React, { useState } from "react";
import { LikeTwoTone,LikeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { Card, Input, message,Select, Button, Form } from "antd";
import { addcomment,modifyStatus,addlike} from "../../store/api";
import { Tag } from 'antd';
import { fetchproblemsas } from "../../store/slices";
export default function Home() {
  const [form] = Form.useForm();
  const data = useSelector((state) => state.User.admin.doubts);
  const [a, seta] = useState("");
  const dispatch = useDispatch();
  const submitlike=async(record)=>{
    addlike({_id: record._id,likes:record.likes,likedby:[...record.likedby,sessionStorage.getItem("name")]})
    .then(() => {
      form.resetFields();
      dispatch(fetchproblemsas());
      message.info("Liked");
    })
    .catch((err) => {
      message.info("Something Went Wrong", 0.5);
    });
  }
  const { Option } = Select;
  const handleStatusChange=async(record,status)=>{
    modifyStatus({id:record._id,status})
    .then(()=>{
      dispatch(fetchproblemsas());
    }).catch(()=>{
      message.error("Something went wrong!");
    })
  }
  const onsubmit = async (s) => {
    if (a === "") {
      message.warning("Add Some Text to comment", 3);
      return;
    }
    addcomment({
      _id: s._id,
      comments: 
        {
          comment: a,
          postedby: sessionStorage.getItem("name"),
        },
    })
      .then(() => {
        seta("");
        form.resetFields();
        dispatch(fetchproblemsas());
        message.info("Comment Added");
      })
      .catch(() => {
        message.info("Something Went Wrong", 0.5);
      });
  };
  return (
    <div>
      <span
        style={{ fontWeight: "bold", fontSize: "20px", margin: "0px 20px" }}
      >
        Home
      </span>
      <br />
      {data.map((d) => {
        return (
          <div key={d._id}>
            <Card
              style={{
                background: "lightgrey",
                margin: "0px 20px",
                maxHeight:"400px",
                overflowY:"scroll"
              }}
            >
              <span>Issue :  {d.title}</span>
              {d.answered && (
                <span
                  style={{
                    background: "rgba(150, 222, 209,0.5)",
                    border: "2px solid rgb(9, 121, 105)",
                    padding: "6px",
                    float: "right",
                    width: "15%",
                    textAlign: "center",
                  }}
                >
                  Resolved
                </span>
              )}    
              <span style={{float:"right"} }>
              <Tag color="blue" style={{padding:"5px",margin:"0px"}}>Current Status
              </Tag>
              <Select
                defaultValue={d.status}
                style={{ width: 150 }}
                onChange={(e) => {
                  if(d.status===e){
                    return;
                  }
                  handleStatusChange(d,e);
                }}
              >
              <Option value="No Action Taken">No Action Taken</Option>
              <Option value="Open">Open </Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
            </span>
              <br />
              <span>Descrption : {d.description}</span>
              <br />
              <span style={{ float: "right" }}>
                posted by: {d.postedby} on {d.createddate}
              </span>
              <br />
              <br />
              {d.answered && (
                <>
                  <span>Answer : {d.answer[0].answer}</span>
                  <br />
                  <span>posted by {d.answer[0].answerby}</span>
                  <br />
                </>
              )}
                            {
              d.likedby.includes(sessionStorage.getItem("name")) ? 
              <LikeTwoTone style={{fontSize:"150%"}}/>  : 
              <LikeOutlined style={{fontSize:"150%"}} onClick={(e)=>{submitlike(d)}}/>
              }
              <span>{d.likes}</span>
              <br />
              <div
                style={{
                  borderTop: "1.5px solid black",
                  marginLeft: "-20px",
                  marginRight: "-11px",
                }}
              ></div>
              <img src={d?.attachment} width="100px" height="100px" alt="Image Not Found"></img>
              {d.comments.length > 0 && (
                <>
                  {d.comments.map((c) => {
                    return (
                      <>
                        <br />
                        <div
                          style={{
                            border: "1px solid black",
                            padding: "5px",
                            width: "100%",
                            wordWrap:"break-word"
                          }}
                          key={c.comment}
                        >
                          {c.postedby}: {c.comment}
                        </div>
                      </>
                    );
                  })}
                </>
              )}
              <br />
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "85%",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  <Form form={form}>
                    <Form.Item name={"comment"+d._id}>
                      <Input
                        placeholder="Add Comment"
                        onChange={(e) => {
                          seta(e.target.value);
                        }}
                      ></Input>
                    </Form.Item>
                  </Form>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginBottom: "25px",
                  }}
                >
                  <Button
                    style={{ float: "right", width: "max-content" }}
                    onClick={() => {
                      onsubmit(d);
                    }}
                  >
                    <span style={{ color: "blue" }}>Comment</span>
                  </Button>
                </div>
              </div>
            </Card>
            <br />
          </div>
        );
      })}
    </div>
  );
}