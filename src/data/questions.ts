import type { Question } from '../types'

export const questions: Question[] = [
  {
    id: "proj-nix",
    prompt: '新项目开仓前，你在什么时候引入 Nix？',
    options: [
      { id: 'A', text: 'Nix? 什么 nix，我不在项目里用 nix' },
      { id: 'B', text: '先用普通工具把环境跑起来，再慢慢整理' },
      { id: 'C', text: '直接写 flake/devenv，结构先锁死' },
      { id: 'D', text: '看公司的要求' },
    ],
  },
  {
    id: "abstract-level",
    prompt: '你怎么看待配置抽象层？',
    options: [
      { id: 'A', text: '主打一个炫技，花里胡哨的' },
      { id: 'B', text: '够用就好，别弄得以后看不懂' },
      { id: 'C', text: '抽象要为复用的效率服务' },
      { id: 'D', text: '我先抄一个，后面再说' },
    ],
  },
  {
    id: "nix-hard",
    prompt: '朋友说 Nix 太难，你会怎么回应？',
    options: [
      { id: 'A', text: '发一份入门指南和 FAQ' },
      { id: 'B', text: '当能工智人，耐心解释和引导 Nix 如何使用' },
      { id: 'C', text: '“Nix 不是有手就行？”' },
      { id: 'D', text: '确实很难，我退坑了（掀桌）' },
    ],
  },
  {
    id: "mut",
    prompt: '看到 mutable 全局状态时你的第一反应？',
    options: [
      { id: 'A', text: '重构成纯函数流' },
      { id: 'B', text: '写个测试/文档把风险圈住' },
      { id: 'C', text: '能跑先跑，有问题再说' },
      { id: 'D', text: '这年头谁写 immutable 啊，你嫌不纯我还嫌费事呢' },
    ],
  },
  {
    id: "build",
    prompt: '你最能接受的构建方式是？',
    options: [
      { id: 'A', text: '本地全编译，参数拉满，写一堆 derivation' },
      { id: 'B', text: '优先命中缓存，节约时间' },
      { id: 'C', text: '我只要别人事先构建好的二进制文件' },
      { id: 'D', text: '不懂啊，我让 AI 给我写一个' },
    ],
  },
  {
    id: "care",
    prompt: '你写 Nix 配置文件的时候更多关心？',
    options: [
      { id: 'A', text: '严谨性，关心语义建模' },
      { id: 'B', text: '做可靠、可复现、人体工程学的工程配置文件' },
      { id: 'C', text: '艺术！就是 Nix！优雅这一块！炫技就完事了！' },
      { id: 'D', text: '我也不知道，反正它能跑' },
    ],
  },
  {
    id: "dotfiles",
    prompt: 'dotfiles 该如何管理？',
    options: [
      { id: 'A', text: 'Home Manager 全托管，全用 nix 配置生成' },
      { id: 'B', text: '有 home manager 的用 nix 配置，没有的放在 dotfiles 里' },
      { id: 'C', text: 'nix 慢死了，我选择用别的方式同步 dotfiles' },
      { id: 'D', text: '每次重装再临场发挥' },
    ],
  },
  {
    id: "immut",
    prompt: '关于不可变系统，你更认同？',
    options: [
      { id: 'A', text: '这是工程可靠性的地基' },
      { id: 'B', text: '理念很好，但要看成本' },
      { id: 'C', text: '我只在关键服务严格执行' },
      { id: 'D', text: '先别聊理念，先把活干了' },
    ],
  },
  {
    id: "how-nix",
    prompt: '你最常开的 Nix 相关页面是？',
    options: [
      { id: 'A', text: '官方文档和 wiki' },
      { id: 'B', text: '社区论坛与讨论群' },
      { id: 'C', text: '搜到哪个开哪个' },
      { id: 'D', text: '问 AI' },
    ],
  },
  {
    id: "team-nix",
    prompt: '假如你要让公司团队引入 Nix，你更可能是？',
    options: [
      { id: 'A', text: '推荐公司使用 nix: 展示 Nix 能带来多大的可靠性' },
      { id: 'B', text: '我是老板，我想引入什么就引入什么' },
      { id: 'C', text: '从小的、不重要的地方试点' },
      { id: 'D', text: '老板让我用什么我就用什么' },
    ],
  },
  {
    id: "pain",
    prompt: '你觉得下面场景种最痛苦的事情是？',
    options: [
      { id: 'A', text: '滚一下系统，滚炸了' },
      { id: 'B', text: '构建慢得怀疑人生' },
      { id: 'C', text: '与别的系统相比，nix学习难度太高了！' },
      { id: 'D', text: '每次重装系统都要重新从零配置' },
    ],
  },
  {
    id: "system",
    prompt: '假如有人送你了一台 Surface（可以转赠和出二手），你会？',
    options: [
      { id: 'A', text: '田字信仰，我选 Windows' },
      { id: 'B', text: '什么 surface, NixOS 启动器罢了' },
      { id: 'C', text: '什么 surface, Arch 启动器罢了' },
      { id: 'D', text: '出掉，小破电脑一点都不适用' },
    ],
  },
  {
    id: "nix-disappears",
    prompt: "有一天，Nix 和 NixOS 突然从地球上消失了……",
    options: [
      { id: 'A', text: '正好换回 pacman' },
      { id: 'B', text: '看来不得不用 Windows 了' },
      { id: 'C', text: '我选 Guix ' },
      { id: 'D', text: '哪个酷我用哪个' },
    ]
  },
  {
    id: "good",
    prompt: '你更看重哪类成就感？',
    options: [
      { id: 'A', text: '把复杂系统配置得清清楚楚' },
      { id: 'B', text: '把流水线跑到丝滑' },
      { id: 'C', text: '把桌面和终端打磨到美仑美奂' },
      { id: 'D', text: '能用就行！' },
    ],
  },
  {
    id: "pack",
    prompt: '遇到了一个软件 nixpkgs 上没有，但是有源码',
    options: [
      { id: 'A', text: '自己写 Nix 表达式打包，顺便做个贡献' },
      { id: 'B', text: 'flatpub，启动！' },
      { id: 'C', text: '人生苦短 我用 Arch' },
      { id: 'D', text: '放弃，换其他软件' },
    ],
  },
  {
    id: "upd",
    prompt: '你平时如何更新系统或者依赖？',
    options: [
      { id: 'A', text: '写个脚本每天升级' },
      { id: 'B', text: '按需升级，需求驱动' },
      { id: 'C', text: '追新版本，先吃螃蟹' },
      { id: 'D', text: '死活不升级，能跑别动' },
    ],
  },
  {
    id: "impure",
    prompt: '你有一个想法，写了一些 nix 配置，却发现它必须 impure',
    options: [
      { id: 'A', text: 'impure 梭就完事了' },
      { id: 'B', text: '前提不成立。我怎么可能会写出需要 impure 的代码？' },
      { id: 'C', text: '遗憾离场，还是用 pure 的写法吧' },
      { id: 'D', text: 'nix 怎么这么坏啊 😭️' },
    ],
  },
  {
    id: "history",
    prompt: '你会怎样处理一个稳定运行很久但没在维护的历史项目？',
    options: [
      { id: 'A', text: '逐步迁移到 Nix，并保留回退' },
      { id: 'B', text: '一次性重构到 Nix，彻底统一' },
      { id: 'C', text: '写个文档就行了，这么久了都没人改说明本来就不需要花时间用上 Nix' },
      { id: 'D', text: '能！跑！就！行！' },
    ],
  },
  {
    id: "new-user",
    prompt: '有一位朋友想要尝试入门 Nix，你推荐……',
    options: [
      { id: 'A', text: '从实践中一点点学习' },
      { id: 'B', text: '快跑，用什么 Nix' },
      { id: 'C', text: '先啃文档，免得踩坑' },
      { id: 'D', text: '快！给你看看我的配置文件怎么写的' },
    ],
  },
  {
    id: "free",
    prompt: '有空时你更可能？',
    options: [
      { id: 'A', text: '给配置重构并加注释' },
      { id: 'B', text: '调性能跑 benchmark' },
      { id: 'C', text: '折腾桌面主题和 shell 提示' },
      { id: 'D', text: '装个新系统' },
    ],
  },
  {
    id: "deps",
    prompt: '朋友和你吐槽遇到了包依赖问题',
    options: [
      { id: 'A', text: '“来用 Nix 吧！”' },
      { id: 'B', text: '“来用 Arch 吧！”' },
      { id: 'C', text: '“来用 Windows 吧！”' },
      { id: 'D', text: '建议换一个软件包' },
    ],
  },
  {
    id: "main-pc",
    prompt: '你会给工作机设定怎样的目标？',
    options: [
      { id: 'A', text: '不小心弄坏了能快速恢复' },
      { id: 'B', text: '极限性能优先，体验其次' },
      { id: 'C', text: '易用性优先' },
      { id: 'D', text: '漂亮最重要，先把主题配齐' },
    ],
  },
  {
    id: "best",
    prompt: 'Nix 最吸引你的是',
    options: [
      { id: 'A', text: '可重现性和可靠性' },
      { id: 'B', text: '声明式构建系统' },
      { id: 'C', text: '拜托，函数式语言真的很酷' },
      { id: 'D', text: '图灵派男娘很多（雾）' },
    ],
  },
  {
    id: "mtf",
    prompt: '你在吃雌二醇 🍥️',
    options: [
      { id: 'A', text: '是的 😋️' },
      { id: 'B', text: '还没有，不过我有一个朋友……' },
      { id: 'C', text: '不是，我只是个普通 Nix 用户' },
      { id: 'D', text: '何意味？' },
    ],
  },
  {
    id: "daily",
    prompt: '你平时主力操作系统是',
    options: [
      { id: 'A', text: 'NixOS' },
      { id: 'B', text: '其他 Linux 比如 Arch' },
      { id: 'C', text: 'Windows' },
      { id: 'D', text: 'MacOS' },
    ],
  },
  {
    id: "one-time",
    prompt: '遇到一段复杂的，一堆副作用的代码，但是它很可能只会被用到一次',
    options: [
      { id: 'A', text: '写个文档备忘得了' },
      { id: 'B', text: '我有强迫症，不把它弄得整洁优雅不行' },
      { id: 'C', text: '代码和我有一个能跑就行' },
      { id: 'D', text: '我不写代码' },
    ],
  },
  {
    id: "xiangni",
    prompt: '下面哪句话最像你？',
    options: [
      { id: 'A', text: '先定义边界，再实现细节' },
      { id: 'B', text: '先把活做完，再逐步还债' },
      { id: 'C', text: '系统应该像函数一样可推导' },
      { id: 'D', text: '我主打一个想到什么做什么' },
    ],
  },
  {
    id: "avatar",
    prompt: '你的头像通常是什么？',
    options: [
      { id: 'A', text: '动漫少女头像' },
      { id: 'B', text: '真人头像' },
      { id: 'C', text: '默头像或随机生成' },
      { id: 'D', text: '画，风景，logo等等' },
    ],
  },
]
