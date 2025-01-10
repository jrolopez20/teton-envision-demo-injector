import React, { useState } from "react";
import { Input, Button, Space, Tabs } from "antd";
import { InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";

const App = () => {
  const [htmlCode, setHtmlCode] = useState("");

  function injectHTML() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (!tabId) return;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: injectCodeIntoPage,
        args: [htmlCode],
      });
    });
  }

  function injectCodeIntoPage(code: string) {
    const div = document.createElement("div");
    div.innerHTML = code;
    document.body.appendChild(div);
  }

  return (
    <div>
      <Tabs
        items={[
          {
            label: `Setup`,
            key: "setup",
            icon: <SettingOutlined />,
            children: (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input.TextArea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  placeholder="Enter HTML code"
                  rows={4}
                />
                <Button
                  type="primary"
                  onClick={injectHTML}
                  style={{ width: "100%" }}
                >
                  Execute
                </Button>
              </Space>
            ),
          },
          {
            label: `Info`,
            key: "info",
            icon: <InfoCircleOutlined />,
            children: `Teton Envision Demo Injector. This plugin allows to insert custom code into the web page to run the Teton Envision Demo`,
          },
        ]}
      />
    </div>
  );
};

export default App;
