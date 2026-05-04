import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "隐私政策",
  description: "Life Poem 如何依据新加坡 PDPA 等法规收集、使用与保护您的个人数据。",
  intro:
    '本隐私政策说明在您使用 Life Poem 移动应用程序（"本应用"）时，我们如何收集、使用、披露和保护您的个人数据。本政策受新加坡《2012 年个人资料保护法令》（"PDPA"）管辖；如适用，第 8 条另列明欧盟/英国 GDPR 及加州 CCPA 项下的额外权利。\n\n通过下载并使用 Life Poem，即表示您同意我们按本政策所述收集、使用和披露您的个人数据。',
  crossLinkLabel: "服务条款",
  crossLinkPath: "terms",
  sections: [
    {
      title: "1. 我们收集的个人数据",
      paragraphs: [
        "我们仅收集本应用运作所必需的资料。我们不投放广告、不出售您的数据，也不与数据经纪商共享。",
      ],
      bullets: [
        "手机号码——通过短信一次性密码登录时提供；储存于 Firebase 身份验证及 Firestore 账户资料。",
        "语音录音——您在 AI 对话中录制的音频；通过 Cloud Function 实时发送至 OpenAI Whisper 转写。Resetrix 在请求完成后不保留音频；OpenAI 可能依其 API 政策保留 API 请求负载至多 30 天以监测滥用。",
        "照片——您附加到故事的图片；上传至 Firebase Cloud Storage，仅限您的账户。",
        "故事内容及对话——您与 AI 的对话、草稿、修订及写作风格；发送至 OpenAI（GPT-4o）；储存于 Firestore，并于设备本地以 SQLite 缓存。",
        "进度元数据——人生阶段与故事时间戳；储存于 Firestore。",
        "用户标识符——Firebase 登录生成的用户 ID，作为服务器端数据的索引键。",
        "设备语言——用于以您的语言显示本应用。",
      ],
    },
    {
      title: "我们不收集的信息",
      paragraphs: [
        "我们不收集：位置、通讯录、日历、健康或健身数据、付款信息、浏览或搜索记录、广告标识符或设备级广告 ID。本应用未嵌入分析、崩溃报告、性能监测或广告 SDK。",
      ],
    },
    {
      title: "2. 收集目的（PDPA 通知义务）",
      paragraphs: ["我们收集您的个人数据用于："],
      bullets: [
        "验证账户（手机号码、用户 ID）；",
        "转录语音并生成 AI 回复（语音、对话、语言）；",
        "保存、编辑、配图您的人生故事（故事内容、照片、进度）；",
        "在您登录的设备之间同步故事；",
        "回应支持请求并履行法律义务。",
      ],
    },
    {
      title: "3. 同意与撤回同意",
      paragraphs: [
        "您于创建账户、授予麦克风/相机/相册权限及首次接受应用内 AI 披露时，表示同意本政策。",
        "您可随时通过 设置 → 账户 → 删除账户 或电邮 DPO 撤回同意。撤回后部分功能将无法使用——例如未将音频发送至 OpenAI 即无法语音转录。",
      ],
    },
    {
      title: "4. 向数据中介披露",
      paragraphs: ["我们使用以下数据中介，其仅代表我们处理数据："],
      bullets: [
        "Google LLC（Firebase）——身份验证、Firestore、Cloud Storage、Cloud Functions、Remote Config；Cloud Functions 位于新加坡（asia-southeast1）。",
        "OpenAI, L.L.C.——Whisper 与 GPT-4o；在美国处理。",
      ],
    },
    {
      title: "4（续） 其他披露",
      paragraphs: [
        "除以下情形外，我们不会向其他第三方披露：(a) 您通过系统分享菜单主动分享故事；(b) 法律、法庭命令或调查欺诈所需。我们不出售个人数据，亦不作广告用途。",
      ],
    },
    {
      title: "5. 跨境传输（PDPA 第 26 条）",
      paragraphs: [
        "部分数据将传输出境——尤其发送至 OpenAI 的内容在美国处理。我们已采取合理措施确认其保护标准与 PDPA 相当（公开条款、认证及合同承诺）。",
      ],
    },
    {
      title: "6. 保留期限",
      paragraphs: [
        "手机号码、用户 ID、故事、照片、进度——账户存续期间保留；删除账户后 30 日内删除。语音仅于转录请求期间保留；OpenAI 依政策至多保留 30 天。备份依 Google 标准随时间覆盖。",
      ],
    },
    {
      title: "7. 安全措施",
      paragraphs: [
        "传输使用 TLS 1.2+；Firestore 与 Cloud Storage 静态加密；Security Rules 限制用户只能访问自有数据；OpenAI 密钥存于 Secret Manager。若发生重大数据泄露，我们将依 PDPA 第 26D 条通知委员会与用户。",
      ],
    },
    {
      title: "8. 您的权利",
      paragraphs: [
        "依 PDPA，您可请求查阅、更正及撤回同意；电邮 DPO，我们将在 30 日内回复。欧盟/英国用户另享有 GDPR 权利；加州用户另享有 CCPA 权利（我们不出售个人信息）。",
      ],
    },
    {
      title: "9. 儿童",
      paragraphs: [
        "本应用面向成年人尤其是长者，并非面向儿童。我们不会有意收集 13 岁以下儿童数据；如发现请联系 DPO 删除。",
      ],
    },
    {
      title: "10. 删除账户",
      paragraphs: [
        "可在 设置 → 账户 → 删除账户 直接删除；亦可通过电邮 DPO，我们将在 30 日内处理。",
      ],
    },
    {
      title: "11. 数据保护官与投诉",
      paragraphs: [
        "Resetrix Pte. Ltd. 已委任 DPO。不满处理结果可向新加坡个人资料保护委员会投诉（pdpc.gov.sg）。",
      ],
    },
    {
      title: "12. 政策修订",
      paragraphs: [
        "若我们实质变更收集或使用方式，将更新本政策并尽量在应用内通知；继续使用即视为接受修订版。",
      ],
    },
    {
      title: "13. 联系方式",
      paragraphs: ["Resetrix Pte. Ltd. 电邮：vernonweehongkoh.developer@outlook.com"],
    },
  ],
};

export default doc;
