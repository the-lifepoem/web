import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "删除您的账户和数据",
  description: "如何永久删除您的岁月故事账户及所有相关数据。",
  intro:
    "您可以随时永久删除您的岁月故事账户及所有相关数据。本页说明删除方式以及将删除哪些内容。",
  crossLinkLabel: "隐私政策",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "方式一 — 在应用内删除",
      paragraphs: [
        "打开岁月故事并登录，进入 设置 → 账户 → 删除账户 并确认。此操作会立即永久删除您在我们系统及设备上的故事、聊天记录、照片、语音内容以及登录账户。",
      ],
    },
    {
      title: "方式二 — 通过电子邮件请求（例如已卸载应用）",
      paragraphs: [
        "如果您无法再打开应用，请使用您注册时的手机号或账户，发送电子邮件至 support@lifepoem.one，主题为「删除账户请求」。您也可以通过 WhatsApp +65 8714 8614 联系我们。我们会在核实后 30 天内完成删除。",
      ],
    },
    {
      title: "将删除哪些内容",
      bullets: [
        "您的账户及手机号登录凭据。",
        "所有人生故事和聊天消息。",
        "所有上传的照片。",
        "任何已保存的打印订单信息（收件人姓名、配送地址、电话号码）。",
      ],
    },
    {
      title: "我们会保留哪些内容",
      paragraphs: [
        "语音录音不会被存储——它们在转录后立即删除，因此无需删除。出于法律、安全或防欺诈目的，我们可能在法律要求的期限内保留有限记录。当我们的 AI 服务商（OpenAI）处理请求时，可能会短暂保留输入内容用于滥用监控，且不会用于训练其模型。",
      ],
    },
    {
      title: "联系方式",
      paragraphs: ["关于删除的问题：support@lifepoem.one。"],
    },
  ],
};

export default doc;
