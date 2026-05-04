import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "服务条款",
  description: "Life Poem（岁月故事）移动应用程序之服务条款。",
  intro: "欢迎使用 Life Poem。使用本应用即表示您同意以下服务条款。若您不同意，请停止使用本应用。",
  crossLinkLabel: "隐私政策",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "1. 使用资格",
      paragraphs: [
        "使用 Life Poem 需年满 13 周岁。若您在所在地区尚未达到完全民事行为能力年龄，需获得家长或监护人同意。",
      ],
    },
    {
      title: "2. 您的账户",
      paragraphs: [
        "部分功能可能需要您验证手机号码。您应自行负责账户所关联的设备和号码的安全。",
      ],
    },
    {
      title: "3. 您的内容",
      paragraphs: [
        "您保留通过 Life Poem 创作的故事、照片和录音（「您的内容」）的所有权。您授予我们有限的许可，仅用于为您提供服务所必需的托管、传输与处理（如转写音频、生成故事草稿、跨设备同步）。",
      ],
    },
    {
      title: "4. AI 生成内容",
      paragraphs: [
        "Life Poem 使用第三方 AI 模型（目前为 OpenAI Whisper 和 GPT-4o）转写音频与撰写故事草稿。AI 输出可能含有不准确之处，不应被视为完全准确。您在分享 AI 生成的文字前应自行审阅。",
      ],
    },
    {
      title: "5. 可接受的使用",
      paragraphs: ["您同意不进行以下行为："],
      bullets: [
        "上传违法、有害、辱骂或侵权内容；",
        "对服务进行逆向工程、干扰或使其过载；",
        "利用本服务侵犯他人隐私或合法权益。",
      ],
    },
    {
      title: "6. 服务可用性",
      paragraphs: [
        "本服务按「现状」提供，可能随时修改、暂停或终止。我们不保证服务始终可用。",
      ],
    },
    {
      title: "7. 免责与责任限制",
      paragraphs: [
        "在适用法律允许的最大范围内，Life Poem 及 Resetrix Pte. Ltd. 不作任何明示或默示保证，对因使用本服务而产生的间接、附带或后果性损害不承担责任。",
      ],
    },
    {
      title: "8. 终止",
      paragraphs: [
        "您可随时停止使用并请求删除账户。若您违反本条款，我们可暂停或终止您的访问。",
      ],
    },
    {
      title: "9. 条款变更",
      paragraphs: [
        "我们可能会更新本条款。页面所示生效日期反映最新版本。如有变更后您仍继续使用，即视为接受更新后的条款。",
      ],
    },
    {
      title: "10. 适用法律",
      paragraphs: ["本条款受新加坡法律管辖，不适用其冲突法规则。"],
    },
    {
      title: "11. 联系",
      paragraphs: ["Resetrix Pte. Ltd. 电邮：vernonweehongkoh.developer@outlook.com"],
    },
  ],
};

export default doc;
