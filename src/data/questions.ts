import type { Question } from '../types'

export const questions: Question[] = [
  {
    id: "proj-nix",
    prompt: '新项目开仓前，你在什么时候引入 Nix？',
    options: [
      { id: 'A', text: 'Nix? 什么 nix，我不在项目里用 nix', effect: { WIN: 2, SHELLU: 1 } },
      { id: 'B', text: '先用普通工具把环境跑起来，再慢慢整理', effect: { PRAG: 2, ENV: 1 } },
      { id: 'C', text: '直接写 flake/devenv，结构先锁死', effect: { REPRO: 2, PLM: 1, ENV: 1 } },
      { id: 'D', text: '看公司的要求', effect: { LBRD: 2, PRAG: 1 } },
    ],
  },
  {
    id: "abstract-level",
    prompt: '你怎么看待配置抽象层？',
    options: [
      { id: 'A', text: '主打一个炫技，花里胡哨的', effect: { COOL: 2, RICE: 1 } },
      { id: 'B', text: '够用就好，别弄得以后看不懂', effect: { MINI: 2, PRAG: 1 } },
      { id: 'C', text: '抽象要为复用的效率服务', effect: { PLM: 2, SPEC: 1 } },
      { id: 'D', text: '我先抄一个，后面再说', effect: { NEWBIE: 2, IDK: 1 } },
    ],
  },
  {
    id: "nix-hard",
    prompt: '朋友说 Nix 太难，你会怎么回应？',
    options: [
      { id: 'A', text: '发一份入门指南和 FAQ', effect: { SPEC: 2, NEWBIE: 1 } },
      { id: 'B', text: '当能工智人，耐心解释和引导 Nix 如何使用', effect: { ENV: 2, PRAG: 1 } },
      { id: 'C', text: '“Nix 不是有手就行？”', effect: { COOL: 1, ARCH: 1, IDK: 1 } },
      { id: 'D', text: '确实很难，我退坑了（掀桌）', effect: { WIN: 2, IDK: 1 } },
    ],
  },
  {
    id: "mut",
    prompt: '看到 mutable 全局状态时你的第一反应？',
    options: [
      { id: 'A', text: '重构成纯函数流', effect: { FPL: 3, PLM: 1 } },
      { id: 'B', text: '写个测试/文档把风险圈住', effect: { REPRO: 2, SPEC: 1 } },
      { id: 'C', text: '能跑先跑，有问题再说', effect: { PRAG: 2, LBRD: 1 } },
      { id: 'D', text: '这年头谁写 immutable 啊，你嫌不纯我还嫌费事呢', effect: { IDK: 1, WIN: 1, PRAG: 1 } },
    ],
  },
  {
    id: "build",
    prompt: '你最能接受的构建方式是？',
    options: [
      { id: 'A', text: '本地全编译，参数拉满，写一堆 derivation', effect: { PKGX: 2, PERF: 1, REPRO: 1 } },
      { id: 'B', text: '优先命中缓存，节约时间', effect: { PERF: 2, DOPS: 1 } },
      { id: 'C', text: '我只要别人事先构建好的二进制文件', effect: { PRAG: 2, WIN: 1 } },
      { id: 'D', text: '不懂啊，我让 AI 给我写一个', effect: { NEWBIE: 1, IDK: 2 } },
    ],
  },
  {
    id: "care",
    prompt: '你写 Nix 配置文件的时候更多关心？',
    options: [
      { id: 'A', text: '严谨性，关心语义建模', effect: { SPEC: 2, PLM: 1 } },
      { id: 'B', text: '做可靠、可复现、人体工程学的工程配置文件', effect: { ENV: 2, REPRO: 1 } },
      { id: 'C', text: '艺术！就是 Nix！优雅这一块！炫技就完事了！', effect: { RICE: 2, COOL: 1 } },
      { id: 'D', text: '我也不知道，反正它能跑', effect: { IDK: 2, PRAG: 1 } },
    ],
  },
  {
    id: "dotfiles",
    prompt: 'dotfiles 该如何管理？',
    options: [
      { id: 'A', text: 'Home Manager 全托管，全用 nix 配置生成', effect: { HOME: 3, ENV: 1 } },
      { id: 'B', text: '有 home manager 的用 nix 配置，没有的放在 dotfiles 里', effect: { HOME: 2, PRAG: 1 } },
      { id: 'C', text: 'nix 慢死了，我选择用别的方式同步 dotfiles', effect: { SHELLU: 2, MINI: 1 } },
      { id: 'D', text: '每次重装再临场发挥', effect: { BOOT: 2, IDK: 1 } },
    ],
  },
  {
    id: "immut",
    prompt: '关于不可变系统，你更认同？',
    options: [
      { id: 'A', text: '这是工程可靠性的地基', effect: { FPL: 2, REPRO: 1 } },
      { id: 'B', text: '理念很好，但要看成本', effect: { PRAG: 2, LBRD: 1 } },
      { id: 'C', text: '我只在关键服务严格执行', effect: { DOPS: 1, REPRO: 1, PRAG: 1 } },
      { id: 'D', text: '先别聊理念，先把活干了', effect: { PRAG: 2, IDK: 1 } },
    ],
  },
  {
    id: "how-nix",
    prompt: '你最常开的 Nix 相关页面是？',
    options: [
      { id: 'A', text: '官方文档和 wiki', effect: { SPEC: 2, NEWBIE: 1 } },
      { id: 'B', text: '社区论坛与讨论群', effect: { ENV: 1, IDK: 1, PRAG: 1 } },
      { id: 'C', text: '搜到哪个开哪个', effect: { IDK: 2, NEWBIE: 1 } },
      { id: 'D', text: '问 AI', effect: { COOL: 1, NEWBIE: 1, IDK: 1 } },
    ],
  },
  {
    id: "team-nix",
    prompt: '假如你要让公司团队引入 Nix，你更可能是？',
    options: [
      { id: 'A', text: '推荐公司使用 nix: 展示 Nix 能带来多大的可靠性', effect: { ENV: 2, REPRO: 1 } },
      { id: 'B', text: '我是老板，我想引入什么就引入什么', effect: { LBRD: 2, PRAG: 1 } },
      { id: 'C', text: '从小的、不重要的地方试点', effect: { PRAG: 2, DOPS: 1 } },
      { id: 'D', text: '老板让我用什么我就用什么', effect: { LBRD: 2, WIN: 1 } },
    ],
  },
  {
    id: "pain",
    prompt: '你觉得下面场景种最痛苦的事情是？',
    options: [
      { id: 'A', text: '滚一下系统，滚炸了', effect: { REPRO: 2, NEWBIE: 1 } },
      { id: 'B', text: '构建慢得怀疑人生', effect: { PERF: 2, DOPS: 1 } },
      { id: 'C', text: '与别的系统相比，nix学习难度太高了！', effect: { NEWBIE: 2, WIN: 1 } },
      { id: 'D', text: '每次重装系统都要重新从零配置', effect: { BOOT: 2, HOME: 1 } },
    ],
  },
  {
    id: "system",
    prompt: '假如有人送你了一台 Surface（可以转赠和出二手），你会？',
    options: [
      { id: 'A', text: '田字信仰，我选 Windows', effect: { WIN: 3 } },
      { id: 'B', text: '什么 surface, NixOS 启动器罢了', effect: { REPRO: 1, ENV: 1, COOL: 1 } },
      { id: 'C', text: '什么 surface, Arch 启动器罢了', effect: { ARCH: 3 } },
      { id: 'D', text: '出掉，小破电脑一点都不适用', effect: { PRAG: 1, IDK: 1, MINI: 1 } },
    ],
  },
  {
    id: "nix-disappears",
    prompt: "有一天，Nix 和 NixOS 突然从地球上消失了……",
    options: [
      { id: 'A', text: '正好换回 pacman', effect: { ARCH: 2, PRAG: 1 } },
      { id: 'B', text: '看来不得不用 Windows 了', effect: { WIN: 2, LBRD: 1 } },
      { id: 'C', text: '我选 Guix ', effect: { FPL: 1, PLM: 1, SPEC: 1 } },
      { id: 'D', text: '哪个酷我用哪个', effect: { COOL: 2, IDK: 1 } },
    ]
  },
  {
    id: "good",
    prompt: '你更看重哪类成就感？',
    options: [
      { id: 'A', text: '把复杂系统配置得清清楚楚', effect: { SPEC: 1, PLM: 1, REPRO: 1 } },
      { id: 'B', text: '把流水线跑到丝滑', effect: { DOPS: 2, PERF: 1 } },
      { id: 'C', text: '把桌面和终端打磨到美仑美奂', effect: { RICE: 3 } },
      { id: 'D', text: '能用就行！', effect: { PRAG: 2, IDK: 1 } },
    ],
  },
  {
    id: "pack",
    prompt: '遇到了一个软件 nixpkgs 上没有，但是有源码',
    options: [
      { id: 'A', text: '自己写 Nix 表达式打包，顺便做个贡献', effect: { PKGX: 3, SPEC: 1 } },
      { id: 'B', text: 'flatpub，启动！', effect: { SHELLU: 1, PRAG: 1, IDK: 1 } },
      { id: 'C', text: '人生苦短 我用 Arch', effect: { ARCH: 2, COOL: 1 } },
      { id: 'D', text: '放弃，换其他软件', effect: { MINI: 1, IDK: 1, WIN: 1 } },
    ],
  },
  {
    id: "upd",
    prompt: '你平时如何更新系统或者依赖？',
    options: [
      { id: 'A', text: '写个脚本每天升级', effect: { DOPS: 2, PERF: 1 } },
      { id: 'B', text: '按需升级，需求驱动', effect: { PRAG: 2, ENV: 1 } },
      { id: 'C', text: '追新版本，先吃螃蟹', effect: { COOL: 2, ARCH: 1 } },
      { id: 'D', text: '死活不升级，能跑别动', effect: { MINI: 2, REPRO: 1 } },
    ],
  },
  {
    id: "impure",
    prompt: '你有一个想法，写了一些 nix 配置，却发现它必须 impure',
    options: [
      { id: 'A', text: 'impure 梭就完事了', effect: { PRAG: 1, IDK: 2 } },
      { id: 'B', text: '前提不成立。我怎么可能会写出需要 impure 的代码？', effect: { FPL: 3, PLM: 1 } },
      { id: 'C', text: '遗憾离场，还是用 pure 的写法吧', effect: { REPRO: 2, FPL: 1 } },
      { id: 'D', text: 'nix 怎么这么坏啊 😭️', effect: { NEWBIE: 2, IDK: 1 } },
    ],
  },
  {
    id: "history",
    prompt: '你会怎样处理一个稳定运行很久但没在维护的历史项目？',
    options: [
      { id: 'A', text: '逐步迁移到 Nix，并保留回退', effect: { PRAG: 2, REPRO: 1 } },
      { id: 'B', text: '一次性重构到 Nix，彻底统一', effect: { PLM: 1, SPEC: 1, ENV: 1 } },
      { id: 'C', text: '写个文档就行了，这么久了都没人改说明本来就不需要花时间用上 Nix', effect: { LBRD: 2, MINI: 1 } },
      { id: 'D', text: '能！跑！就！行！', effect: { IDK: 2, PRAG: 1 } },
    ],
  },
  {
    id: "new-user",
    prompt: '有一位朋友想要尝试入门 Nix，你推荐……',
    options: [
      { id: 'A', text: '从实践中一点点学习', effect: { NEWBIE: 2, PRAG: 1 } },
      { id: 'B', text: '快跑，用什么 Nix', effect: { WIN: 1, ARCH: 1, IDK: 1 } },
      { id: 'C', text: '先啃文档，免得踩坑', effect: { SPEC: 2, REPRO: 1 } },
      { id: 'D', text: '快！给你看看我的配置文件怎么写的', effect: { COOL: 2, RICE: 1 } },
    ],
  },
  {
    id: "free",
    prompt: '有空时你更可能？',
    options: [
      { id: 'A', text: '给配置重构并加注释', effect: { SPEC: 1, HOME: 1, REPRO: 1 } },
      { id: 'B', text: '调性能跑 benchmark', effect: { PERF: 3 } },
      { id: 'C', text: '折腾桌面主题和 shell 提示', effect: { RICE: 3 } },
      { id: 'D', text: '装个新系统', effect: { BOOT: 2, ARCH: 1 } },
    ],
  },
  {
    id: "deps",
    prompt: '朋友和你吐槽遇到了包依赖问题',
    options: [
      { id: 'A', text: '“来用 Nix 吧！”', effect: { ENV: 2, REPRO: 1 } },
      { id: 'B', text: '“来用 Arch 吧！”', effect: { ARCH: 2, COOL: 1 } },
      { id: 'C', text: '“来用 Windows 吧！”', effect: { WIN: 2, PRAG: 1 } },
      { id: 'D', text: '建议换一个软件包', effect: { PRAG: 2, MINI: 1 } },
    ],
  },
  {
    id: "main-pc",
    prompt: '你会给工作机设定怎样的目标？',
    options: [
      { id: 'A', text: '不小心弄坏了能快速恢复', effect: { REPRO: 2, BOOT: 1 } },
      { id: 'B', text: '极限性能优先，体验其次', effect: { PERF: 3 } },
      { id: 'C', text: '易用性优先', effect: { PRAG: 2, WIN: 1 } },
      { id: 'D', text: '漂亮最重要，先把主题配齐', effect: { RICE: 3 } },
    ],
  },
  {
    id: "best",
    prompt: 'Nix 最吸引你的是',
    options: [
      { id: 'A', text: '可重现性和可靠性', effect: { REPRO: 2, FPL: 1 } },
      { id: 'B', text: '声明式构建系统', effect: { PLM: 2, PKGX: 1 } },
      { id: 'C', text: '拜托，函数式语言真的很酷', effect: { FPL: 2, COOL: 1 } },
      { id: 'D', text: '图灵派男娘很多（雾）', effect: { XYN: 4, COOL: 1 } },
    ],
  },
  {
    id: "mtf",
    prompt: '你在吃雌二醇 🍥️',
    options: [
      { id: 'A', text: '是的 😋️', effect: { XYN: 6 } },
      { id: 'B', text: '还没有，不过我有一个朋友……', effect: { XYN: 2, IDK: 1 } },
      { id: 'C', text: '不是，我只是个普通 Nix 用户', effect: { PRAG: 1, NEWBIE: 1, IDK: 1 } },
      { id: 'D', text: '何意味？', effect: { IDK: 2, NEWBIE: 1 } },
    ],
  },
  {
    id: "daily",
    prompt: '你平时主力操作系统是',
    options: [
      { id: 'A', text: 'NixOS', effect: { REPRO: 1, ENV: 1, FPL: 1 } },
      { id: 'B', text: '其他 Linux 比如 Arch', effect: { ARCH: 2, COOL: 1 } },
      { id: 'C', text: 'Windows', effect: { WIN: 3 } },
      { id: 'D', text: 'MacOS', effect: { RICE: 1, PRAG: 1, MINI: 1 } },
    ],
  },
  {
    id: "one-time",
    prompt: '遇到一段复杂的，一堆副作用的代码，但是它很可能只会被用到一次',
    options: [
      { id: 'A', text: '写个文档备忘得了', effect: { PRAG: 2, MINI: 1 } },
      { id: 'B', text: '我有强迫症，不把它弄得整洁优雅不行', effect: { SPEC: 1, PLM: 1, FPL: 1 } },
      { id: 'C', text: '代码和我有一个能跑就行', effect: { IDK: 2, PRAG: 1 } },
      { id: 'D', text: '我不写代码', effect: { WIN: 1, IDK: 1, LBRD: 1 } },
    ],
  },
  {
    id: "xiangni",
    prompt: '下面哪句话最像你？',
    options: [
      { id: 'A', text: '先定义边界，再实现细节', effect: { SPEC: 2, PLM: 1 } },
      { id: 'B', text: '先把活做完，再逐步还债', effect: { PRAG: 2, DOPS: 1 } },
      { id: 'C', text: '系统应该像函数一样可推导', effect: { FPL: 2, PLM: 1 } },
      { id: 'D', text: '我主打一个想到什么做什么', effect: { IDK: 3 } },
    ],
  },
  {
    id: "avatar",
    prompt: '你的头像通常是什么？',
    options: [
      { id: 'A', text: '动漫少女头像', effect: { XYN: 3, RICE: 1 } },
      { id: 'B', text: '真人头像', effect: { PRAG: 1, LBRD: 1, IDK: 1 } },
      { id: 'C', text: '默头像或随机生成', effect: { MINI: 1, IDK: 1, SHELLU: 1 } },
      { id: 'D', text: '画，风景，logo等等', effect: { RICE: 2, COOL: 1 } },
    ],
  },
  {
    id: 'pure-vs-speed',
    prompt: '面对“纯度 vs 交付速度”，你通常站哪边？',
    options: [
      { id: 'A', text: '纯度优先，长期收益更大', effect: { FPL: 3, PLM: 1 } },
      { id: 'B', text: '先交付，后续逐步纯化', effect: { PRAG: 3, ENV: 1 } },
      { id: 'C', text: '看团队阶段，动态平衡', effect: { LBRD: 2, PRAG: 1, DOPS: 1 } },
      { id: 'D', text: '我选最酷的那条路', effect: { COOL: 3, RICE: 1 } },
    ],
  },
]
