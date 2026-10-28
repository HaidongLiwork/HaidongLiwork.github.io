window.LIMIT_PROBLEMS = [
  {
    "id": "SUB-01",
    "method": "substitute",
    "difficulty": 1,
    "form": "确定值",
    "formula": "\\lim_{x\\to 2}(x^2-3x+4)",
    "options": ["substitute", "degree", "important"],
    "hint": "先算一下 x=2 时这个多项式的值，看看代进去会不会出问题。",
    "signals": ["x=2 是多项式的连续点", "代入得到有限数，分母没有变零"],
    "correctWhy": "多项式在 x=2 连续，所以极限等于函数值，直接代入即可。",
    "wrongWhy": {
      "degree": "x 趋于 2 是有限点，不存在“无穷远最高次”的问题；同除最高次幂会制造多余的 1/x 项。",
      "important": "式子里既没有 sin□/□，也没有 (1+□)^(1/□)，凑不出两个重要极限。"
    },
    "steps": [
      {"title": "确认连续性", "text": "多项式在 $x=2$ 连续，因此 $\\lim\\limits_{x\\to2}(x^2-3x+4)$ 等于函数在 $x=2$ 处的值。"},
      {"title": "直接代入", "text": "$2^2-3\\cdot2+4=4-6+4=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "不是所有极限都要变形。先代入，能直接算出确定值就不要绕路。",
    "source": "讲义 §1.4.2（L3822–3962）；§1.2.3（L2639–2670）"
  },
  {
    "id": "SUB-02",
    "method": "substitute",
    "difficulty": 1,
    "form": "确定值",
    "formula": "\\lim_{x\\to 1}\\dfrac{2x+1}{x^2+3}",
    "options": ["substitute", "degree", "nonexistence"],
    "hint": "先看分母在 x=1 的值；如果它不是 0，直接算函数值。",
    "signals": ["分母的极限为 4，不为 0", "分子在 x=1 连续"],
    "correctWhy": "分子、分母在 x=1 附近都连续，且分母极限 4≠0，可以由商的极限法则直接代入。",
    "wrongWhy": {
      "degree": "x→1 是有限点，不是无穷远过程，不能比较最高次幂。",
      "nonexistence": "分母在 x=1 不为 0，函数是连续的，没有左右极限不等或振荡的问题。"
    },
    "steps": [
      {"title": "先检查分母", "text": "当 $x\\to1$ 时，$x^2+3\\to4\\ne0$，商的极限法则有条件使用。"},
      {"title": "直接代入", "text": "$\\dfrac{2\\cdot1+1}{1^2+3}=\\dfrac34$。"}
    ],
    "answer": "$\\dfrac34$",
    "pitfall": "商的极限法则要先检查分母极限非零，再代入分子、分母。",
    "source": "讲义 §1.4.2（L3822–3962）"
  },
  {
    "id": "SUB-03",
    "method": "substitute",
    "difficulty": 1,
    "form": "确定值",
    "formula": "\\lim_{x\\to 3}\\sqrt{x^3-1}",
    "options": ["substitute", "equivalent", "squeeze"],
    "hint": "根号里面的式子在 x=3 附近正常吗？",
    "signals": ["x=3 在根号内表达式的定义区间内", "复合函数在该点连续"],
    "correctWhy": "根号与多项式复合后在 x=3 附近连续，x=3 又落在定义区间内，可以直接代入。",
    "wrongWhy": {
      "equivalent": "等价无穷小要有一个趋于 0 的无穷小因子；这里是趋于 √26 的确定值，没有可替换的无穷小。",
      "squeeze": "不需要构造上下界：函数在 x=3 连续，直接代入已经得到确定值。"
    },
    "steps": [
      {"title": "看定义域", "text": "在 $x=3$ 附近 $x^3-1>0$，根式有意义。"},
      {"title": "代入", "text": "$\\sqrt{3^3-1}=\\sqrt{26}$。"}
    ],
    "answer": "$\\sqrt{26}$",
    "pitfall": "根号函数也是初等函数，在定义区间内连续；先确认根号内有意义，再代入。",
    "source": "讲义 §1.4.2（L3822–3962）"
  },
  {
    "id": "SUB-04",
    "method": "substitute",
    "difficulty": 1,
    "form": "确定值",
    "formula": "\\lim_{x\\to\\pi/4}\\tan x",
    "options": ["substitute", "important", "degree"],
    "hint": "x=π/4 在 tan x 的定义区间内吗？",
    "signals": ["π/4 处 cos x≠0", "tan x 是初等函数，在定义区间内连续"],
    "correctWhy": "tan x 在 π/4 的邻域内有定义且连续，直接代入得到 tan(π/4)=1。",
    "wrongWhy": {
      "important": "本题没有 sin□/□ 的无穷小结构，也不是 1^∞；不需要凑两个重要极限。",
      "degree": "x→π/4 是有限点，不是 x→∞，不需要比较最高次。"
    },
    "steps": [
      {"title": "检查连续性", "text": "$\\cos(\\pi/4)=\\sqrt2/2\\ne0$，$\\tan x$ 在 $\\pi/4$ 附近连续。"},
      {"title": "代入", "text": "$\\tan\\dfrac\\pi4=1$。"}
    ],
    "answer": "$1$",
    "pitfall": "看到三角就想到重要极限是常见误判；先检查是否只是连续点代值。",
    "source": "讲义 §1.4.2（L3822–3962）"
  },
  {
    "id": "SUB-05",
    "method": "substitute",
    "difficulty": 2,
    "form": "确定值",
    "formula": "\\lim_{x\\to 0}\\dfrac{\\sin x+\\cos x}{1+x}",
    "options": ["substitute", "important", "bounded"],
    "hint": "先算分子、分母在 x=0 的值；这是不是一个连续的初等函数？",
    "signals": ["分子在 x=0 的值为 1", "分母在 x=0 的值为 1", "分子、分母都是连续函数"],
    "correctWhy": "分子 sin x+cos x 与分母 1+x 都在 0 附近连续，分母极限 1≠0，因此直接代入。",
    "wrongWhy": {
      "important": "sin x 虽然出现，但分母不是配套的 x，也没有 1^∞ 结构；先把整个分式的连续性看清楚。",
      "bounded": "这里没有“有界函数乘趋零因子”：分子趋于 1，分母趋于 1，整个分式趋于 1。"
    },
    "steps": [
      {"title": "先看整体", "text": "不要因为出现 $\\sin x$ 就拆结构。分子、分母在 $x=0$ 附近都连续。"},
      {"title": "检查分母", "text": "$1+x\\to1\\ne0$。"},
      {"title": "代入", "text": "$\\dfrac{\\sin0+\\cos0}{1+0}=\\dfrac{0+1}{1}=1$。"}
    ],
    "answer": "$1$",
    "pitfall": "三角函数的极限不都要用第一个重要极限；整体连续时先代值。",
    "source": "讲义 §1.4.2（L3822–3962）"
  },
  {
    "id": "ALG-01",
    "method": "algebra",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "先代入 x=3，看看分子、分母各是多少。",
    "signals": ["代入得 0/0", "分子有 x−3 这个因式"],
    "correctWhy": "0/0 不能直接用商法则；约去公因子 x−3 后，分母极限不再为 0。",
    "wrongWhy": {
      "substitute": "代入得 0/0。商的极限法则要求分母极限非零，所以这一步无法继续。",
      "degree": "x→3 是有限点，不是无穷远；同除最高次幂只会把式子弄复杂。"
    },
    "steps": [
      {"title": "代入识别", "text": "当 $x\\to3$ 时，分子、分母都趋于 0，是 $0/0$ 型。"},
      {"title": "因式分解", "text": "$x^2-9=(x-3)(x+3)$。"},
      {"title": "约分后代入", "text": "当 $x\\ne3$ 时，原式 $=x+3$，所以极限为 $3+3=6$。"}
    ],
    "answer": "$6$",
    "pitfall": "约分只在 x≠3 时进行；极限恰恰不关心 x=3 这一点。",
    "source": "讲义 §1.2.3（L2639–2670）；重点难点 §9.2.2"
  },
  {
    "id": "ALG-02",
    "method": "algebra",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to 2}\\dfrac{x^2+x-6}{x-2}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "分子能不能分解出 x−2？",
    "signals": ["代入 x=2 得 0/0", "二次三项式可以因式分解"],
    "correctWhy": "把分子分解为 (x−2)(x+3)，约去零因子后可以直接代入。",
    "wrongWhy": {
      "substitute": "代入得到 0/0，商法则在分母极限为 0 时失效。",
      "degree": "这是有限点 x=2 的极限，不是 ∞/∞；最高次比较无法处理约分问题。"
    },
    "steps": [
      {"title": "确认 0/0", "text": "$2^2+2-6=0$，分母也为 0。"},
      {"title": "因式分解", "text": "$x^2+x-6=(x-2)(x+3)$。"},
      {"title": "约分求值", "text": "$\\dfrac{(x-2)(x+3)}{x-2}=x+3\\to5$。"}
    ],
    "answer": "$5$",
    "pitfall": "先看能不能消去导致 0 的因子，不要急着把分子拆成两个极限。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-03",
    "method": "algebra",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to 1}\\dfrac{x^3-1}{x-1}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "立方差公式是什么？",
    "signals": ["代入得 0/0", "分子是 x³−1，可用立方差分解"],
    "correctWhy": "用立方差公式分解并约去 x−1，分母不再趋于 0。",
    "wrongWhy": {
      "substitute": "代入得 0/0，不能直接得到极限值。",
      "degree": "x→1 是有限点；同除最高次幂适用于无穷远，这里应当先约分。"
    },
    "steps": [
      {"title": "因式分解", "text": "$x^3-1=(x-1)(x^2+x+1)$。"},
      {"title": "约分", "text": "当 $x\\ne1$ 时，原式 $=x^2+x+1$。"},
      {"title": "代入", "text": "$1^2+1+1=3$。"}
    ],
    "answer": "$3$",
    "pitfall": "立方差不是只背结果，要看清它能约掉哪一个零因子。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-04",
    "method": "algebra",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to 2}\\dfrac{x^2-4}{x^2-3x+2}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "分子、分母都能分解出 x−2，先都分解。",
    "signals": ["分子、分母都含 x−2 因子", "代入得 0/0"],
    "correctWhy": "上下都分解并约去 x−2，剩下的分式在 x=2 处分母非零。",
    "wrongWhy": {
      "substitute": "分子、分母都趋于 0，0/0 不是合法结果。",
      "degree": "虽然都是二次式，但极限点是 x=2；本题需要约分，不是比较无穷远次数。"
    },
    "steps": [
      {"title": "分解", "text": "$x^2-4=(x-2)(x+2)$，$x^2-3x+2=(x-2)(x-1)$。"},
      {"title": "约分", "text": "当 $x\\ne2$ 时，$\\dfrac{x^2-4}{x^2-3x+2}=\\dfrac{x+2}{x-1}$。"},
      {"title": "代入", "text": "$\\dfrac{2+2}{2-1}=4$。"}
    ],
    "answer": "$4$",
    "pitfall": "约分后要重新检查分母；本题剩下 x−1，在 x=2 处不为 0。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-05",
    "method": "algebra",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to 2}\\dfrac{x^3-8}{x^2-4}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "分子用立方差，分母用平方差，它们都能提出 x−2。",
    "signals": ["分子是 x³−8，分母是 x²−4", "代入 x=2 得 0/0"],
    "correctWhy": "分子、分母都含 x−2，约分后分母极限为 4，不为 0。",
    "wrongWhy": {
      "substitute": "x=2 时分子、分母都为 0，必须先把零因子约掉。",
      "degree": "x→2 不是无穷远；比较最高次不能解决有限点的 0/0。"
    },
    "steps": [
      {"title": "分别分解", "text": "$x^3-8=(x-2)(x^2+2x+4)$，$x^2-4=(x-2)(x+2)$。"},
      {"title": "约分", "text": "当 $x\\ne2$ 时，原式 $=\\dfrac{x^2+2x+4}{x+2}$。"},
      {"title": "代入", "text": "$\\dfrac{4+4+4}{4}=3$。"}
    ],
    "answer": "$3$",
    "pitfall": "分子、分母的因式分解分别完成后，才能安全约分。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-06",
    "method": "algebra",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to 0}\\dfrac{(1+x)^2-1}{x}",
    "options": ["algebra", "substitute", "important"],
    "hint": "先把分子展开，看看还剩什么。",
    "signals": ["代入得 0/0", "分子平方展开后会出现与分母同阶的 x"],
    "correctWhy": "展开分子后得到 2x+x²，再除以 x，可以直接代入。",
    "wrongWhy": {
      "substitute": "代入得到 0/0，不能直接算。",
      "important": "这里既没有 sin□/□，也不是 1^∞；平方展开就足以消去零因子。"
    },
    "steps": [
      {"title": "展开", "text": "$(1+x)^2-1=1+2x+x^2-1=2x+x^2$。"},
      {"title": "约去 x", "text": "当 $x\\ne0$ 时，$\\dfrac{2x+x^2}{x}=2+x$。"},
      {"title": "代入", "text": "$2+0=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "展开是消去零因子的一种代数变形，不必一看到 0/0 就急着换更复杂的工具。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-07",
    "method": "algebra",
    "difficulty": 2,
    "form": "确定值",
    "formula": "\\lim_{x\\to+\\infty}\\dfrac{(2x+1)^2-(2x-1)^2}{x}",
    "options": ["algebra", "substitute", "important"],
    "hint": "两个平方相减，先展开会得到什么？",
    "signals": ["分子是两个平方的差", "展开后 x² 项会抵消，只剩一次项"],
    "correctWhy": "展开分子后，二次项抵消，分子变成 8x，再与分母约分，极限为 8。",
    "wrongWhy": {
      "substitute": "∞ 不是数，不能直接代入；这是 x→∞ 的过程。",
      "important": "没有 sin 结构，也没有 1^∞；先把平方差展开是关键。"
    },
    "steps": [
      {"title": "展开平方差", "text": "$(2x+1)^2-(2x-1)^2=(4x^2+4x+1)-(4x^2-4x+1)=8x$。"},
      {"title": "约分", "text": "原式 $=\\dfrac{8x}{x}=8$，在 $x\\to+\\infty$ 时恒为 8。"},
      {"title": "取极限", "text": "常数的极限为 8。"}
    ],
    "answer": "$8$",
    "pitfall": "无穷远处的极限也可以先做恒等变形，不必一上来就同除最高次。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-08",
    "method": "algebra",
    "difficulty": 2,
    "form": "确定值",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{1+3+5+\\cdots+(2n-1)}{n^2}",
    "options": ["algebra", "substitute", "important"],
    "hint": "前 n 个奇数相加等于多少？",
    "signals": ["分子是等差数列的和", "项数随 n 变化，不能直接把它当作普通多项式"],
    "correctWhy": "先用等差数列求和公式把分子化成 n²，再约分。",
    "wrongWhy": {
      "substitute": "n→∞，不能把 ∞ 代入；分子、分母都在无界增长。",
      "important": "没有三角函数或 e 型结构，关键是先求和。"
    },
    "steps": [
      {"title": "用求和公式", "text": "$1+3+5+\\cdots+(2n-1)=n^2$。"},
      {"title": "约分", "text": "原式 $=\\dfrac{n^2}{n^2}=1$。"},
      {"title": "取极限", "text": "常数数列的极限为 1。"}
    ],
    "answer": "$1$",
    "pitfall": "分子是 n 项和，先化成封闭形式，才能安全地把 n 当作变量处理。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-09",
    "method": "algebra",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to 1}\\left(\\dfrac1{x-1}-\\dfrac2{x^2-1}\\right)",
    "options": ["algebra", "substitute", "degree"],
    "hint": "两个分式相减，先通分。",
    "signals": ["每一项单独看都发散", "通分后会出现 x−1 公因子"],
    "correctWhy": "通分后分子变成 x−1，与分母约去，剩下 1/(x+1)，可以直接代入。",
    "wrongWhy": {
      "substitute": "两项分别趋于无穷，不能把 ∞−∞ 直接当作 0 或某个数。",
      "degree": "这是有限点 x=1 的分式差，不是无穷远有理式；先通分才能看到零因子。"
    },
    "steps": [
      {"title": "通分", "text": "$\\dfrac1{x-1}-\\dfrac2{x^2-1}=\\dfrac{(x+1)-2}{(x-1)(x+1)}=\\dfrac{x-1}{(x-1)(x+1)}$。"},
      {"title": "约分", "text": "当 $x\\ne1$ 时，原式 $=\\dfrac1{x+1}$。"},
      {"title": "代入", "text": "$\\dfrac1{1+1}=\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "∞−∞ 没有定义，分式相减要先通分，不要分别求极限。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "ALG-10",
    "method": "algebra",
    "difficulty": 3,
    "form": "0/0",
    "formula": "\\lim_{x\\to 1}\\dfrac{x^4-1}{x-1}",
    "options": ["algebra", "substitute", "degree"],
    "hint": "x⁴−1 可以连续使用平方差公式。",
    "signals": ["代入得 0/0", "x=1 是 x⁴−1 的零点"],
    "correctWhy": "把 x⁴−1 分解出 x−1，约分后得到三次多项式，直接代入。",
    "wrongWhy": {
      "substitute": "代入得 0/0，必须消去零因子。",
      "degree": "x→1 是有限点；同除最高次适用于 x→∞，这里应做因式分解。"
    },
    "steps": [
      {"title": "分解", "text": "$x^4-1=(x-1)(x^3+x^2+x+1)$。"},
      {"title": "约分", "text": "当 $x\\ne1$ 时，原式 $=x^3+x^2+x+1$。"},
      {"title": "代入", "text": "$1+1+1+1=4$。"}
    ],
    "answer": "$4$",
    "pitfall": "高次差也可以通过因式分解处理，不要以为只有二次平方差。",
    "source": "讲义 §1.2.3（L2639–2670）"
  },
  {
    "id": "DEG-01",
    "method": "degree",
    "difficulty": 1,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to\\infty}\\dfrac{3x^2-2x+1}{x^2+5}",
    "options": ["degree", "substitute", "important"],
    "hint": "分子、分母都是二次式，同除 x² 看看剩下什么。",
    "signals": ["x→∞，分子、分母都无界", "分子、分母的最高次都是二次"],
    "correctWhy": "分子、分母同除 x²，低次项趋于 0，极限由最高次项系数比决定。",
    "wrongWhy": {
      "substitute": "∞ 不是数，不能直接代入；代入后会得到没有定义的 ∞/∞。",
      "important": "没有 sin 或 e 型结构，本题是有理式在无穷远处的极限。"
    },
    "steps": [
      {"title": "同除 x²", "text": "$\\dfrac{3-\\frac2x+\\frac1{x^2}}{1+\\frac5{x^2}}$。"},
      {"title": "令低次项趋于 0", "text": "$\\frac1x\\to0$，$\\frac1{x^2}\\to0$。"},
      {"title": "读系数比", "text": "极限为 $\\dfrac31=3$。"}
    ],
    "answer": "$3$",
    "pitfall": "不是保留所有项，而是看最高次项；低次项在无穷远处趋于 0。",
    "source": "讲义 §1.2.3（L2639–2670, L2943–2958）"
  },
  {
    "id": "DEG-02",
    "method": "degree",
    "difficulty": 1,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to\\infty}\\dfrac{2x^3+x}{4x^3-1}",
    "options": ["degree", "substitute", "algebra"],
    "hint": "最高次都是 x³，最高次项系数各是多少？",
    "signals": ["分子、分母最高次都是三次", "极限等于最高次项系数比"],
    "correctWhy": "同除 x³ 后，只剩最高次项系数比 2/4。",
    "wrongWhy": {
      "substitute": "∞/∞ 不是合法数值，不能把无穷大代进去。",
      "algebra": "分子分母没有共同的有限点零因子；这里的问题不是 x→某个数，而是无穷远的主导项。"
    },
    "steps": [
      {"title": "同除 x³", "text": "$\\dfrac{2+\\frac1{x^2}}{4-\\frac1{x^3}}$。"},
      {"title": "取极限", "text": "$\\dfrac{2+0}{4-0}=\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "次数相同的无穷远有理式，极限是最高次项系数之比，不是 0。",
    "source": "讲义 §1.2.3（L2943–2958）"
  },
  {
    "id": "DEG-03",
    "method": "degree",
    "difficulty": 1,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to\\infty}\\dfrac{x^4+2x}{2x^4-x^2}",
    "options": ["degree", "substitute", "bounded"],
    "hint": "只看最高次 x⁴ 的系数。",
    "signals": ["分子、分母都是四次式", "低次项在无穷远可忽略"],
    "correctWhy": "同除 x⁴ 后，低次项都趋于 0，系数比为 1/2。",
    "wrongWhy": {
      "substitute": "∞ 不是实数，直接代入会得到未定义的 ∞/∞。",
      "bounded": "这里没有有界振荡因子；分子、分母都无界增长，是有理式的主导项比较。"
    },
    "steps": [
      {"title": "同除 x⁴", "text": "$\\dfrac{1+\\frac2{x^3}}{2-\\frac1{x^2}}$。"},
      {"title": "代入极限", "text": "$\\dfrac{1+0}{2-0}=\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "最高次项相同，极限不是 ∞，也不是 0，而是系数比。",
    "source": "讲义 §1.2.3（L2943–2958）"
  },
  {
    "id": "DEG-04",
    "method": "degree",
    "difficulty": 1,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to\\infty}\\dfrac{x^2+1}{x^3+2}",
    "options": ["degree", "substitute", "important"],
    "hint": "分母的次数比分子高，结果会趋向哪里？",
    "signals": ["分母次数高于分子", "同除分母最高次后，分子中会出现 1/x"],
    "correctWhy": "分子、分母同除 x³，分子趋于 0，分母趋于 1，所以极限为 0。",
    "wrongWhy": {
      "substitute": "此时代入会得到没有定义的 ∞/∞，而 ∞ 不是可以代入的数。",
      "important": "本题是有理式，既没有 sin□/□ 也没有 1^∞；比较次数即可。"
    },
    "steps": [
      {"title": "同除 x³", "text": "$\\dfrac{\\frac1x+\\frac1{x^3}}{1+\\frac2{x^3}}$。"},
      {"title": "让 1/x 项趋于 0", "text": "分子趋于 0，分母趋于 1。"},
      {"title": "取极限", "text": "极限为 $\\dfrac01=0$。"}
    ],
    "answer": "$0$",
    "pitfall": "分母次数高时，整个分式被分母“压”向 0；不要因为分子、分母都无界就犹豫。",
    "source": "讲义 §1.2.3（L2943–2958）"
  },
  {
    "id": "DEG-05",
    "method": "degree",
    "difficulty": 2,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to+\\infty}\\dfrac{x^3+2x^2}{x^2-1}",
    "options": ["degree", "substitute", "squeeze"],
    "hint": "分母二次、分子三次，先同除 x²。",
    "signals": ["分子次数高于分母", "x→+∞，因此整体无界增长"],
    "correctWhy": "同除 x² 后，分子留下 x，分母趋于 1，整体趋向 +∞。",
    "wrongWhy": {
      "substitute": "∞ 不是数，代入不会得到有限极限；这是无穷远处的主导项问题。",
      "squeeze": "不需要夹逼：分子、分母的阶数已经清楚，同除最高次可直接判断。"
    },
    "steps": [
      {"title": "同除 x²", "text": "原式 $=\\dfrac{x+2}{1-\\frac1{x^2}}$。"},
      {"title": "判断趋势", "text": "当 $x\\to+\\infty$ 时，分子 $x+2\\to+\\infty$，分母 $\\to1$。"},
      {"title": "结论", "text": "原极限记作 $+\\infty$；这不是有限极限，按定义不称收敛。"}
    ],
    "answer": "$+\\infty$",
    "pitfall": "写 +∞ 只是描述无界增长，极限并不存在为有限数；要说明不是“收敛到 +∞”。",
    "source": "讲义 §1.2.3（L2593–2963）"
  },
  {
    "id": "DEG-06",
    "method": "degree",
    "difficulty": 2,
    "form": "∞/∞",
    "formula": "\\lim_{x\\to-\\infty}\\dfrac{5x^2-x}{2x^2+3x-1}",
    "options": ["degree", "substitute", "important"],
    "hint": "分子、分母都是二次，x→−∞ 时系数比仍然是 5/2。",
    "signals": ["分子、分母最高次相同", "注意极限过程是 x→−∞ 而不是 +∞"],
    "correctWhy": "同除 x² 后，所有含 1/x 的项都趋于 0，极限仍是最高次项系数比 5/2。",
    "wrongWhy": {
      "substitute": "−∞ 不是数，不能直接代入；无穷远要看最高次项。",
      "important": "没有特殊三角或 e 结构，本题只需比较有限项的最高次。"
    },
    "steps": [
      {"title": "同除 x²", "text": "$\\dfrac{5-\\frac1x}{2+\\frac3x-\\frac1{x^2}}$。"},
      {"title": "利用 1/x→0", "text": "不论 $x\\to+\\infty$ 还是 $x\\to-\\infty$，都有 $1/x\\to0$。"},
      {"title": "取极限", "text": "$\\dfrac{5-0}{2+0-0}=\\dfrac52$。"}
    ],
    "answer": "$\\dfrac52$",
    "pitfall": "次数相同时，x→−∞ 也可能得到正系数比；不要只看“负号”就猜结果是负的。",
    "source": "讲义 §1.2.3（L2943–2958）"
  },
  {
    "id": "DEG-07",
    "method": "degree",
    "difficulty": 1,
    "form": "∞/∞",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{2n^2+3n+1}{n^2-n+4}",
    "options": ["degree", "substitute", "algebra"],
    "hint": "数列也是 n→∞ 的有理式，同除 n²。",
    "signals": ["分子、分母都是 n 的二次式", "这是 n→∞ 的 ∞/∞ 型"],
    "correctWhy": "分子、分母同除 n²，低次项趋于 0，极限为 2。",
    "wrongWhy": {
      "substitute": "n→∞ 不能把 ∞ 当数代入。",
      "algebra": "因式分解没有共同的零因子可约；关键是分子、分母次数相同，应看最高次项系数比。"
    },
    "steps": [
      {"title": "同除 n²", "text": "$\\dfrac{2+\\frac3n+\\frac1{n^2}}{1-\\frac1n+\\frac4{n^2}}$。"},
      {"title": "取极限", "text": "所有含 $1/n$ 的项趋于 0，得到 $\\dfrac21=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "数列极限和函数极限的运算法则一致；n 是离散变量，但同样可以同除最高次。",
    "source": "讲义 §1.2.3（L2593–2963）"
  },
  {
    "id": "DEG-08",
    "method": "degree",
    "difficulty": 2,
    "form": "∞/∞",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{(2n+1)(n-3)}{n^2+4}",
    "options": ["degree", "substitute", "squeeze"],
    "hint": "先把分子展开，找出它的二次项。",
    "signals": ["分子是两个一次式的积，展开后是二次", "分母也是二次"],
    "correctWhy": "展开分子得到 2n²−5n−3，再同除 n²，低次项消失，极限为 2。",
    "wrongWhy": {
      "substitute": "n→∞ 时分子、分母都无界，∞/∞ 不能直接代入。",
      "squeeze": "没有需要夹逼的振荡项；展开后比较二次项系数即可。"
    },
    "steps": [
      {"title": "展开分子", "text": "$(2n+1)(n-3)=2n^2-5n-3$。"},
      {"title": "同除 n²", "text": "$\\dfrac{2-\\frac5n-\\frac3{n^2}}{1+\\frac4{n^2}}$。"},
      {"title": "取极限", "text": "$\\dfrac{2-0-0}{1+0}=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "乘积形式先展开再比较次数，避免把两个一次式的积误当成一次。",
    "source": "讲义 §1.2.3（L2593–2963）"
  },
  {
    "id": "IMP-01",
    "method": "important",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin x}{x}",
    "options": ["important", "substitute", "degree"],
    "hint": "这是第一个重要极限的标准形式。",
    "signals": ["x→0 时 sin x 与 x 都趋于 0", "结构正好是 sin□/□，且□=x"],
    "correctWhy": "这正是第一个重要极限，极限值为 1。",
    "wrongWhy": {
      "substitute": "代入得 0/0，商的极限法则要求分母极限非零，所以不能直接算。",
      "degree": "x→0 是有限点，不是无穷远；没有最高次幂可比较。"
    },
    "steps": [
      {"title": "识别标准形式", "text": "令 $u=x$，则 $u\\to0$，式子就是 $\\dfrac{\\sin u}{u}$。"},
      {"title": "使用重要极限", "text": "$\\lim\\limits_{u\\to0}\\dfrac{\\sin u}{u}=1$，所以原极限为 1。"}
    ],
    "answer": "$1$",
    "pitfall": "sin x~x 这个等价结论正是由该重要极限推出的；在这里直接做等价替换会绕成循环。",
    "source": "讲义 §1.3.1（L3018–3050）"
  },
  {
    "id": "IMP-02",
    "method": "important",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin3x}{x}",
    "options": ["important", "substitute", "degree"],
    "hint": "把分子、分母凑成同一个角 3x。",
    "signals": ["sin 的角是 3x，分母是 x", "x→0 时 3x→0"],
    "correctWhy": "乘以 3/3，把式子写成 3·sin(3x)/(3x)，再用第一个重要极限。",
    "wrongWhy": {
      "substitute": "代入得 0/0，不能直接得到 3 或 0。",
      "degree": "这里没有 x→∞ 的最高次比较；关键是凑成 sin□/□。"
    },
    "steps": [
      {"title": "凑同角", "text": "$\\dfrac{\\sin3x}{x}=3\\cdot\\dfrac{\\sin3x}{3x}$。"},
      {"title": "换元", "text": "令 $u=3x$，则 $u\\to0$。"},
      {"title": "取极限", "text": "$3\\cdot1=3$。"}
    ],
    "answer": "$3$",
    "pitfall": "重要极限的 u 必须与分母一致；漏掉前面的系数 3 是常见错误。",
    "source": "讲义 §1.3.1（L3018–3180）"
  },
  {
    "id": "IMP-03",
    "method": "important",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin5x}{\\sin3x}",
    "options": ["important", "substitute", "degree"],
    "hint": "上下分别凑出 sin(5x)/(5x) 和 sin(3x)/(3x)。",
    "signals": ["分子、分母都是 sin 型", "两个角都趋于 0"],
    "correctWhy": "把两个分式都凑成标准重要极限，剩下的系数比是 5/3。",
    "wrongWhy": {
      "substitute": "sin0/sin0=0/0，不能直接算。",
      "degree": "这是有限点 x→0 的三角比，不是无穷远有理式。"
    },
    "steps": [
      {"title": "拆成两个标准比", "text": "$\\dfrac{\\sin5x}{\\sin3x}=\\dfrac{\\sin5x}{5x}\\cdot\\dfrac{3x}{\\sin3x}\\cdot\\dfrac53$。"},
      {"title": "用重要极限", "text": "$\\dfrac{\\sin5x}{5x}\\to1$，$\\dfrac{3x}{\\sin3x}\\to1$。"},
      {"title": "乘系数", "text": "$1\\cdot1\\cdot\\dfrac53=\\dfrac53$。"}
    ],
    "answer": "$\\dfrac53$",
    "pitfall": "系数要完整保留；两个重要极限都趋于 1，但 5/3 不会消失。",
    "source": "讲义 §1.3.1（L3018–3180）"
  },
  {
    "id": "IMP-04",
    "method": "important",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\tan2x}{x}",
    "options": ["important", "substitute", "degree"],
    "hint": "先写成 tan2x=sin2x/cos2x，再凑 sin2x/(2x)。",
    "signals": ["tan 可以写成 sin/cos", "x→0 时 2x→0、cos2x→1"],
    "correctWhy": "tan2x=sin2x/cos2x，拆成 2·sin(2x)/(2x)·1/cos2x，极限为 2。",
    "wrongWhy": {
      "substitute": "tan0/0=0/0，不能直接计算。",
      "degree": "x→0 不是无穷远，比较最高次没有意义。"
    },
    "steps": [
      {"title": "化成正弦与余弦", "text": "$\\dfrac{\\tan2x}{x}=\\dfrac{\\sin2x}{x\\cos2x}=2\\cdot\\dfrac{\\sin2x}{2x}\\cdot\\dfrac1{\\cos2x}$。"},
      {"title": "分别求极限", "text": "$\\dfrac{\\sin2x}{2x}\\to1$，$\\cos2x\\to1$。"},
      {"title": "相乘", "text": "$2\\cdot1\\cdot1=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "tan 不能直接套 sin□/□；先化成正弦和余弦，保留系数。",
    "source": "讲义 §1.3.1（L3018–3180）"
  },
  {
    "id": "IMP-05",
    "method": "important",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}",
    "options": ["important", "substitute", "degree"],
    "hint": "用 1−cos x=2sin²(x/2)，再凑 sin(x/2)/(x/2)。",
    "signals": ["1−cos x 在 x→0 时为 0", "半角公式可以化出 sin²"],
    "correctWhy": "用半角公式后，原式等于 (1/2)[sin(x/2)/(x/2)]²，极限为 1/2。",
    "wrongWhy": {
      "substitute": "1−cos0=0，分母也为 0，仍是 0/0。",
      "degree": "这是有限点 x→0，不是无穷远；应使用三角恒等式和重要极限。"
    },
    "steps": [
      {"title": "半角公式", "text": "$1-\\cos x=2\\sin^2\\dfrac x2$。"},
      {"title": "整理", "text": "$\\dfrac{1-\\cos x}{x^2}=\\dfrac12\\left(\\dfrac{\\sin(x/2)}{x/2}\\right)^2$。"},
      {"title": "取极限", "text": "$\\dfrac12\\cdot1^2=\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "1−cos x 是二阶无穷小；把它当成 x 量级会得到错误答案。",
    "source": "讲义 §1.3.1（L3018–3180）"
  },
  {
    "id": "IMP-06",
    "method": "important",
    "difficulty": 1,
    "form": "1^∞",
    "formula": "\\lim_{n\\to\\infty}\\left(1+\\dfrac1n\\right)^n",
    "options": ["important", "substitute", "degree"],
    "hint": "这是第二个重要极限的定义。",
    "signals": ["底数趋于 1", "指数趋于 ∞", "结构正好是 (1+1/n)^n"],
    "correctWhy": "这是第二个重要极限，按定义记为 e。",
    "wrongWhy": {
      "substitute": "底数→1、指数→∞，这是 1^∞ 未定式，不能直接写成 1。",
      "degree": "这不是无穷远的有理式比值；应识别 (1+□)^{1/□} 的结构。"
    },
    "steps": [
      {"title": "识别标准形式", "text": "令 $\\Box=\\dfrac1n$，则 $\\Box\\to0$，指数 $n=\\dfrac1{\\Box}$。"},
      {"title": "使用第二个重要极限", "text": "$\\lim\\limits_{\\Box\\to0}(1+\\Box)^{1/\\Box}=e$，所以原极限为 e。"}
    ],
    "answer": "$e$",
    "pitfall": "1^∞ 不是 1；e 是由这个极限定义出来的常数。",
    "source": "讲义 §1.3.1（L3225–3326）"
  },
  {
    "id": "IMP-07",
    "method": "important",
    "difficulty": 1,
    "form": "1^∞",
    "formula": "\\lim_{n\\to\\infty}\\left(1+\\dfrac2n\\right)^n",
    "options": ["important", "substitute", "degree"],
    "hint": "把指数 n 凑成 n/2，再整体平方。",
    "signals": ["底数趋于 1，指数趋于 ∞", "内部是 2/n，像 (1+u)^{1/u}"],
    "correctWhy": "令 u=2/n，则 n=2/u，原式是 [(1+u)^{1/u}]²，极限为 e²。",
    "wrongWhy": {
      "substitute": "代入得到 1^∞，这是未定式，不是 1。",
      "degree": "与无穷远多项式无关；关键是凑第二个重要极限的倒数指数。"
    },
    "steps": [
      {"title": "换元", "text": "令 $u=\\dfrac2n$，则 $u\\to0$，$n=\\dfrac2u$。"},
      {"title": "整理成标准形式", "text": "$\\left[(1+u)^{1/u}\\right]^2$。"},
      {"title": "取极限", "text": "$e^2$。"}
    ],
    "answer": "$e^2$",
    "pitfall": "指数中的 n 要跟着 2/n 一起调整，得到平方，而不是 e。",
    "source": "讲义 §1.3.1（L3225–3326）"
  },
  {
    "id": "IMP-08",
    "method": "important",
    "difficulty": 2,
    "form": "1^∞",
    "formula": "\\lim_{n\\to\\infty}\\left(1-\\dfrac1n\\right)^n",
    "options": ["important", "substitute", "degree"],
    "hint": "把负号吸进底数：1−1/n=1+(−1/n)。",
    "signals": ["底数趋于 1，指数趋于 ∞", "内部增量为 −1/n"],
    "correctWhy": "令 u=−1/n，则 n=−1/u，原式是 [(1+u)^{1/u}]^{−1}，极限为 e^{−1}。",
    "wrongWhy": {
      "substitute": "1^∞ 不能直接代入；符号不同会改变 e 的指数。",
      "degree": "这不是多项式比值，不能通过最高次比较处理。"
    },
    "steps": [
      {"title": "换元", "text": "令 $u=-\\dfrac1n$，则 $u\\to0$，$n=-\\dfrac1u$。"},
      {"title": "整理", "text": "$\\left(1+u\\right)^{-1/u}=\\left[(1+u)^{1/u}\\right]^{-1}$。"},
      {"title": "取极限", "text": "$e^{-1}$。"}
    ],
    "answer": "$e^{-1}$",
    "pitfall": "负号会变成 e 的负指数；不要不加分析地写成 e。",
    "source": "讲义 §1.3.1（L3225–3326）"
  },
  {
    "id": "IMP-09",
    "method": "important",
    "difficulty": 2,
    "form": "1^∞",
    "formula": "\\lim_{x\\to0}(1+2x)^{1/x}",
    "options": ["important", "substitute", "degree"],
    "hint": "把指数 1/x 写成 2·1/(2x)，再凑标准形式。",
    "signals": ["x→0，底数→1，指数无界", "内部增量是 2x"],
    "correctWhy": "原式 = [(1+2x)^{1/(2x)}]²，内层趋于 e，所以极限为 e²。",
    "wrongWhy": {
      "substitute": "得到 1^∞，这是未定式，不能直接写 1。",
      "degree": "x→0 是有限点，不是无穷远；关键是凑第二个重要极限。"
    },
    "steps": [
      {"title": "凑指数", "text": "$(1+2x)^{1/x}=\\left[(1+2x)^{1/(2x)}\\right]^2$。"},
      {"title": "换元", "text": "令 $u=2x\\to0$，内层是 $(1+u)^{1/u}\\to e$。"},
      {"title": "外层平方", "text": "由幂函数连续性，极限为 $e^2$。"}
    ],
    "answer": "$e^2$",
    "pitfall": "指数 1/x 与外层平方的 2 一一对应；漏掉平方会错写成 e。",
    "source": "讲义 §1.3.1（L3225–3326）"
  },
  {
    "id": "IMP-10",
    "method": "important",
    "difficulty": 3,
    "form": "1^∞",
    "formula": "\\lim_{x\\to0}(1+2x)^{3/\\sin x}",
    "options": ["important", "substitute", "degree"],
    "hint": "先把指数拆成 (1/(2x))·(6x/sin x)。",
    "signals": ["底数→1，指数无界", "指数含 sin x，可再用 sin x~x 型极限"],
    "correctWhy": "把幂拆成 [(1+2x)^{1/(2x)}]^{6x/sin x}；内层→e，外层指数→6，极限为 e⁶。",
    "wrongWhy": {
      "substitute": "得到 1^∞，不能直接写 1 或 e。",
      "degree": "这是 x→0 的 1^∞ 型，不是无穷远有理式；应凑第二个重要极限。"
    },
    "steps": [
      {"title": "拆幂", "text": "$(1+2x)^{3/\\sin x}=\\left[(1+2x)^{1/(2x)}\\right]^{6x/\\sin x}$。"},
      {"title": "内层", "text": "令 $u=2x\\to0$，$(1+u)^{1/u}\\to e$。"},
      {"title": "指数", "text": "$\\dfrac{6x}{\\sin x}\\to6$。"},
      {"title": "合成", "text": "由幂函数连续性，极限为 $e^6$。"}
    ],
    "answer": "$e^6$",
    "pitfall": "两个重要极限可以叠加使用，但拆幂时必须保持指数恒等，不能漏系数。",
    "source": "讲义 §1.3.1（L3225–3326）；重点难点 P58"
  },
  {
    "id": "EQU-01",
    "method": "equivalent",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\tan2x}{\\sin5x}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "tan2x 与 sin5x 都是乘除因子，想一想它们各自的等价无穷小。",
    "signals": ["x→0 时 tan2x、sin5x 都趋于 0", "分子、分母各是一个乘除因子"],
    "correctWhy": "tan2x~2x，sin5x~5x，二者都在乘除位置，比值趋于 2/5。",
    "wrongWhy": {
      "substitute": "代入得 0/0，不能直接算；这是需要处理无穷小的 0/0 型。",
      "degree": "x→0 是有限点，没有最高次项比较；同除最高次在这里不适用。"
    },
    "steps": [
      {"title": "确认过程", "text": "都在 $x\\to0$ 下，且 $2x\\to0$、$5x\\to0$。"},
      {"title": "分别替换乘除因子", "text": "$\\tan2x\\sim2x$，$\\sin5x\\sim5x$。"},
      {"title": "约分求极限", "text": "$\\dfrac{2x}{5x}=\\dfrac25$。"}
    ],
    "answer": "$\\dfrac25$",
    "pitfall": "等价替换只用于乘除因子；本题分子、分母各是一个整体因子，可以换。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-02",
    "method": "equivalent",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin x}{x^2+3x}",
    "options": ["equivalent", "substitute", "squeeze"],
    "hint": "分母可以先写成 x(x+3)，再看哪些是乘除因子。",
    "signals": ["分子 sin x~x", "分母有公因子 x，剩下 x+3→3"],
    "correctWhy": "sin x~x，分母 x²+3x=x(x+3)~3x，都是乘除因子，约去 x 后极限为 1/3。",
    "wrongWhy": {
      "substitute": "代入得 0/0，必须处理无穷小因子。",
      "squeeze": "这里不需要夹逼；分子、分母的等价无穷小关系已经给出简单的比值。"
    },
    "steps": [
      {"title": "分解分母", "text": "$x^2+3x=x(x+3)$，其中 $x+3\\to3$。"},
      {"title": "等价替换", "text": "$\\sin x\\sim x$，$x^2+3x\\sim3x$。"},
      {"title": "求比值", "text": "$\\dfrac{x}{3x}=\\dfrac13$。"}
    ],
    "answer": "$\\dfrac13$",
    "pitfall": "分母是两项相加，不能直接把 x² 和 3x 分别换掉；先提出公因子化成 x(x+3)。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-03",
    "method": "equivalent",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{(1+x^2)^{1/3}-1}{\\cos x-1}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "分子用 (1+u)^m−1~mu，分母用 1−cos x~x²/2，注意符号。",
    "signals": ["分子是 (1+x²)^{1/3}−1", "分母 cos x−1 是负的二阶无穷小"],
    "correctWhy": "取 u=x²、m=1/3，分子~x²/3；分母 cos x−1~−x²/2，比值趋于 −2/3。",
    "wrongWhy": {
      "substitute": "代入得 0/0，必须先做等价替换。",
      "degree": "x→0 是有限点，本题是无穷小阶的比较，不是无穷远最高次。"
    },
    "steps": [
      {"title": "分子的等价", "text": "$(1+x^2)^{1/3}-1\\sim\\dfrac{x^2}{3}$。"},
      {"title": "分母的等价", "text": "$1-\\cos x\\sim\\dfrac{x^2}{2}$，所以 $\\cos x-1\\sim-\\dfrac{x^2}{2}$。"},
      {"title": "求比值", "text": "$\\dfrac{x^2/3}{-x^2/2}=-\\dfrac23$。"}
    ],
    "answer": "$-\\dfrac23$",
    "pitfall": "分母是 cos x−1，不是 1−cos x；少一个负号是最常见的错误。",
    "source": "讲义 §1.3.2（L3354–3495）；重点难点 P43"
  },
  {
    "id": "EQU-04",
    "method": "equivalent",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{1-\\cos2x}{x\\sin x}",
    "options": ["equivalent", "substitute", "squeeze"],
    "hint": "1−cos2x 是二阶无穷小，先算它的系数。",
    "signals": ["1−cos2x 在 0 附近是二阶", "分母 x sin x 也是二阶"],
    "correctWhy": "1−cos2x~2x²，x sin x~x²，约去 x² 后极限为 2。",
    "wrongWhy": {
      "substitute": "得到 0/0，不能直接求值。",
      "squeeze": "这里的等价无穷小已经足够，直接构造上下界是绕远路。"
    },
    "steps": [
      {"title": "分子", "text": "$1-\\cos2x=2\\sin^2x\\sim2x^2$。"},
      {"title": "分母", "text": "$x\\sin x\\sim x^2$。"},
      {"title": "求比值", "text": "$\\dfrac{2x^2}{x^2}=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "1−cos2x 的系数是 2，不要只写 x² 或 x²/2。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-05",
    "method": "equivalent",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sqrt{1+x}-1}{x}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "用 √[n]{1+x}−1~x/n，这里 n=2。",
    "signals": ["分子是根式差，x→0", "分母是一次 x"],
    "correctWhy": "√(1+x)−1~x/2，与分母 x 约去后极限为 1/2。",
    "wrongWhy": {
      "substitute": "代入得 0/0，不能直接算。",
      "degree": "x→0 是有限点，不是无穷远；根式差的处理靠等价无穷小。"
    },
    "steps": [
      {"title": "套等价公式", "text": "$\\sqrt{1+x}-1=(1+x)^{1/2}-1\\sim\\dfrac{x}{2}$。"},
      {"title": "求比值", "text": "$\\dfrac{x/2}{x}=\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "根式差的等价系数是 1/n，不是 n；这里是 1/2，不是 2。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-06",
    "method": "equivalent",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin3x}{\\sqrt{1+x}-1}",
    "options": ["equivalent", "substitute", "squeeze"],
    "hint": "分子、分母分别求等价无穷小，再除以彼此。",
    "signals": ["sin3x~3x", "√(1+x)−1~x/2"],
    "correctWhy": "分子~3x，分母~x/2，比值极限为 6。",
    "wrongWhy": {
      "substitute": "分母为 0、分子也为 0，是 0/0。",
      "squeeze": "乘除因子替换已经可以直接得到答案，不需要构造夹逼。"
    },
    "steps": [
      {"title": "分子等价", "text": "$\\sin3x\\sim3x$。"},
      {"title": "分母等价", "text": "$\\sqrt{1+x}-1\\sim\\dfrac{x}{2}$。"},
      {"title": "求比值", "text": "$\\dfrac{3x}{x/2}=6$。"}
    ],
    "answer": "$6$",
    "pitfall": "分母是根式差，系数 1/2 在分母上，取倒数后变成 2，别漏。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-07",
    "method": "equivalent",
    "difficulty": 1,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{(1+x)^{1/3}-1}{x}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "套 (1+x)^m−1~mx，m=1/3。",
    "signals": ["分子是 (1+x)^m−1 的标准形式", "指数 m=1/3 是固定常数"],
    "correctWhy": "(1+x)^{1/3}−1~x/3，与分母 x 约去后极限为 1/3。",
    "wrongWhy": {
      "substitute": "代入得到 0/0，分子、分母同时为 0，不能直接下结论。",
      "degree": "x→0 的有限点极限，不需要比较无穷远的最高次。"
    },
    "steps": [
      {"title": "确认指数固定", "text": "这里 $m=1/3$ 不随 $x$ 改变，可以使用 $(1+x)^m-1\\sim mx$。"},
      {"title": "替换", "text": "$(1+x)^{1/3}-1\\sim\\dfrac{x}{3}$。"},
      {"title": "求比值", "text": "$\\dfrac{x/3}{x}=\\dfrac13$。"}
    ],
    "answer": "$\\dfrac13$",
    "pitfall": "这个等价公式要求指数 m 固定；若指数随极限过程变化，不能直接套用。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-08",
    "method": "equivalent",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin(x^2)}{1-\\cos x}",
    "options": ["equivalent", "substitute", "squeeze"],
    "hint": "sin(x²)~x²，1−cos x~x²/2。",
    "signals": ["x→0 时 x²→0", "分子、分母都是二阶无穷小"],
    "correctWhy": "sin(x²)~x²，1−cos x~x²/2，比值趋于 2。",
    "wrongWhy": {
      "substitute": "代入得 0/0，需要比较无穷小。",
      "squeeze": "等价关系已经直接给出比值，夹逼没有额外帮助。"
    },
    "steps": [
      {"title": "分子", "text": "因为 $x^2\\to0$，所以 $\\sin(x^2)\\sim x^2$。"},
      {"title": "分母", "text": "$1-\\cos x\\sim\\dfrac{x^2}{2}$。"},
      {"title": "求比值", "text": "$\\dfrac{x^2}{x^2/2}=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "sin(x²) 的等价对象是 x²，不是 x；要把整个角看成一个无穷小。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "EQU-09",
    "method": "equivalent",
    "difficulty": 3,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{\\sin x-\\tan x}{x^3}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "先别急着把 sin x、tan x 都换成 x；先提公因式，把差化成乘积。",
    "signals": ["分子是差，不能逐项替换", "sin x−tan x=tan x(cos x−1) 可化成乘积"],
    "correctWhy": "先提公因式：sin x−tan x=tan x(cos x−1)。化成乘积后，tan x~x，cos x−1~−x²/2，极限为 −1/2。",
    "wrongWhy": {
      "substitute": "代入得 0/0，必须先做变形。",
      "degree": "x→0 是有限点，比较无穷远最高次完全不适用。"
    },
    "steps": [
      {"title": "化为乘积", "text": "$\\sin x-\\tan x=\\tan x(\\cos x-1)$。"},
      {"title": "对乘除因子替换", "text": "$\\tan x\\sim x$，$\\cos x-1\\sim-\\dfrac{x^2}{2}$。"},
      {"title": "求比值", "text": "$\\dfrac{x\\cdot(-x^2/2)}{x^3}=-\\dfrac12$。"}
    ],
    "answer": "$-\\dfrac12$",
    "pitfall": "等价替换只对乘除整体成立。把分子逐项换成 x−x=0 会得到 0，这是错误的。",
    "source": "讲义 §1.3.2（L3354–3495）；重点难点 §12.2.5"
  },
  {
    "id": "EQU-10",
    "method": "equivalent",
    "difficulty": 2,
    "form": "0/0",
    "formula": "\\lim_{x\\to0}\\dfrac{(1+x)^{3/2}-1}{x}",
    "options": ["equivalent", "substitute", "degree"],
    "hint": "套 (1+x)^m−1~mx，m=3/2。",
    "signals": ["分子是 (1+x)^m−1 的形式", "指数 3/2 固定"],
    "correctWhy": "(1+x)^{3/2}−1~3x/2，与分母 x 约去后极限为 3/2。",
    "wrongWhy": {
      "substitute": "代入得 0/0，不能直接算。",
      "degree": "x→0 是有限点；这里的核心是固定指数的等价无穷小。"
    },
    "steps": [
      {"title": "确认标准形式", "text": "$m=3/2$ 是固定常数。"},
      {"title": "替换", "text": "$(1+x)^{3/2}-1\\sim\\dfrac32x$。"},
      {"title": "求比值", "text": "$\\dfrac{(3/2)x}{x}=\\dfrac32$。"}
    ],
    "answer": "$\\dfrac32$",
    "pitfall": "系数是 m，不是 m 的倒数；3/2 阶对应系数 3/2。",
    "source": "讲义 §1.3.2（L3354–3495）"
  },
  {
    "id": "SQC-01",
    "method": "squeeze",
    "difficulty": 2,
    "form": "夹逼型",
    "formula": "\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{\\sqrt{n^2+k}}",
    "options": ["squeeze", "degree", "equivalent"],
    "hint": "共有 n 项，每一项都在 1/√(n²+n) 与 1/√(n²+1) 之间。",
    "signals": ["和式的项数随 n 变化", "每项的分母都介于两个相近的量之间"],
    "correctWhy": "把 n 项统一放大、缩小，得到两端都趋于 1 的上下界，再由夹逼准则得 1。",
    "wrongWhy": {
      "degree": "这不是单个有理式的比值；共有 n 项，直接同除最高次会把“项数 n”和“每项大小”混在一起。",
      "equivalent": "没有 x→0 的标准无穷小因子；关键是给整个和式构造上下界。"
    },
    "steps": [
      {"title": "找下界", "text": "每一项都满足 $\\dfrac1{\\sqrt{n^2+k}}\\ge\\dfrac1{\\sqrt{n^2+n}}$，共有 n 项，所以和 $\\ge\\dfrac{n}{\\sqrt{n^2+n}}$。"},
      {"title": "找上界", "text": "同理，和 $\\le\\dfrac{n}{\\sqrt{n^2+1}}$。"},
      {"title": "两端同极限", "text": "$\\dfrac{n}{\\sqrt{n^2+n}}=\\dfrac1{\\sqrt{1+1/n}}\\to1$，$\\dfrac{n}{\\sqrt{n^2+1}}=\\dfrac1{\\sqrt{1+1/n^2}}\\to1$。"},
      {"title": "夹逼", "text": "上下界都趋于 1，所以原和式极限为 1。"}
    ],
    "answer": "$1$",
    "pitfall": "夹逼必须同时给出下界和上界，并确认两端趋于同一个数。",
    "source": "讲义 §1.3.1（L2985–3017）"
  },
  {
    "id": "SQC-02",
    "method": "squeeze",
    "difficulty": 2,
    "form": "夹逼型",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{n}{2n+\\sin n}",
    "options": ["squeeze", "substitute", "equivalent"],
    "hint": "sin n 被夹在 −1 与 1 之间，把分母也夹起来。",
    "signals": ["分母含振荡的 sin n", "sin n 有界，可替换成两个常数界"],
    "correctWhy": "利用 −1≤sin n≤1，把分母夹在 2n−1 与 2n+1 之间，两端都趋于 1/2。",
    "wrongWhy": {
      "substitute": "n→∞ 时分子、分母都无界，不能把 ∞ 当成数代入。",
      "equivalent": "题目没有趋于 0 的乘除因子；sin n 的角不趋于 0，也不能对它做无穷小替换。"
    },
    "steps": [
      {"title": "夹住 sin n", "text": "$-1\\le\\sin n\\le1$，所以 $2n-1\\le2n+\\sin n\\le2n+1$。"},
      {"title": "取倒数并乘以 n", "text": "对 $n\\ge1$，$\\dfrac{n}{2n+1}\\le\\dfrac{n}{2n+\\sin n}\\le\\dfrac{n}{2n-1}$。"},
      {"title": "两端同极限", "text": "$\\dfrac{n}{2n\\pm1}\\to\\dfrac12$。"},
      {"title": "夹逼", "text": "所以原极限为 $\\dfrac12$。"}
    ],
    "answer": "$\\dfrac12$",
    "pitfall": "sin n 本身没有极限，但有界；夹逼正是利用“有界”而不是要求它有极限。",
    "source": "讲义 §1.3.1（L2985–3017）"
  },
  {
    "id": "SQC-03",
    "method": "squeeze",
    "difficulty": 2,
    "form": "夹逼型",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{\\sin1+\\sin2+\\cdots+\\sin n}{n^2}",
    "options": ["squeeze", "degree", "important"],
    "hint": "分子有 n 项，每一项都在 −1 与 1 之间，先估计整个分子。",
    "signals": ["分子是 n 项的和", "每一项的绝对值不超过 1"],
    "correctWhy": "分子被 ±n 夹住，除以 n² 后两边都趋于 0，所以原极限为 0。",
    "wrongWhy": {
      "degree": "分母虽然比分子中的项数增长得快，但分子不是固定次数的多项式，不能直接做最高次比。",
      "important": "sin k 的角不趋于 0，且没有 sin□/□ 的结构，不能使用第一个重要极限。"
    },
    "steps": [
      {"title": "估计分子", "text": "因为 $|\\sin k|\\le1$，所以 $|\\sin1+\\cdots+\\sin n|\\le n$。"},
      {"title": "构造上下界", "text": "$-\\dfrac{n}{n^2}\\le\\dfrac{\\sin1+\\cdots+\\sin n}{n^2}\\le\\dfrac{n}{n^2}$，即 $-\\dfrac1n\\le\\cdots\\le\\dfrac1n$。"},
      {"title": "两端趋于 0", "text": "$1/n\\to0$，由夹逼准则得原极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "不需要知道部分和 sin1+…+sinn 的精确值；只要能控制它的量级。",
    "source": "讲义 §1.3.1（L2985–3017）"
  },
  {
    "id": "SQC-04",
    "method": "squeeze",
    "difficulty": 3,
    "form": "夹逼型",
    "formula": "\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\dfrac{1}{n^2+k}",
    "options": ["squeeze", "degree", "substitute"],
    "hint": "和式共有 n 项；每项不超过 1/n²，也不小于某个量。",
    "signals": ["项数随 n 增加", "每项都为正，且量级至多 1/n²"],
    "correctWhy": "和式被 0 与 n/(n²+1) 夹住，右端趋于 0，所以极限为 0。",
    "wrongWhy": {
      "degree": "这是一个有 n 项的变量项数之和，不是单个有理式；不能直接把它当成分子、分母次数比较。",
      "substitute": "n→∞ 不能直接代入，而且项数也随 n 增加。"
    },
    "steps": [
      {"title": "下界", "text": "每一项都大于 0，所以和 $\\ge0$。"},
      {"title": "上界", "text": "共有 n 项，每项都小于等于 $\\dfrac1{n^2+1}$，所以和 $\\le\\dfrac{n}{n^2+1}$。"},
      {"title": "两端同极限", "text": "$0\\to0$，$\\dfrac{n}{n^2+1}=\\dfrac{1/n}{1+1/n^2}\\to0$。"},
      {"title": "夹逼", "text": "由夹逼准则，原和式的极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "n 项和的上界要看“项数 × 每项的上界”，不能只估计最后一项。",
    "source": "讲义 §1.3.1（L2985–3017）"
  },
  {
    "id": "BND-01",
    "method": "bounded",
    "difficulty": 1,
    "form": "有界×0",
    "formula": "\\lim_{x\\to0}x\\sin\\dfrac1x",
    "options": ["bounded", "substitute", "important"],
    "hint": "sin(1/x) 会振荡，但它始终被限制在 −1 和 1 之间。",
    "signals": ["x→0 是趋零因子", "sin(1/x) 有界"],
    "correctWhy": "sin(1/x) 在 x≠0 时有界，x→0 是无穷小，有界函数乘无穷小仍为无穷小。",
    "wrongWhy": {
      "substitute": "x=0 时 sin(1/x) 没有定义，不能直接代入。",
      "important": "这不是 sin□/□ 型，1/x 也不趋于 0；不要硬套第一个重要极限。"
    },
    "steps": [
      {"title": "识别乘积", "text": "$x\\to0$，同时 $|\\sin(1/x)|\\le1$。"},
      {"title": "用有界×无穷小", "text": "有界量乘无穷小仍是无穷小，所以乘积趋于 0。"},
      {"title": "结论", "text": "极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "sin(1/x) 本身没有极限，但它的“有界性”足以让乘积趋于 0。",
    "source": "讲义 §1.2.3（L2777–2785）"
  },
  {
    "id": "BND-02",
    "method": "bounded",
    "difficulty": 1,
    "form": "有界×0",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{\\sin n}{n}",
    "options": ["bounded", "degree", "substitute"],
    "hint": "sin n 有界，1/n 趋于 0。",
    "signals": ["sin n 在 −1 与 1 之间", "分母 n 使整体趋于 0"],
    "correctWhy": "sin n 有界，1/n 是无穷小，乘积为无穷小。",
    "wrongWhy": {
      "degree": "这不是有理式的最高次项比较；sin n 不是多项式。",
      "substitute": "n→∞ 时 sin n 振荡，不能直接代入。"
    },
    "steps": [
      {"title": "看结构", "text": "$\\dfrac{\\sin n}{n}=\\sin n\\cdot\\dfrac1n$。"},
      {"title": "分别判断", "text": "$|\\sin n|\\le1$ 有界，$\\dfrac1n\\to0$。"},
      {"title": "结论", "text": "有界×无穷小，极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "sin n 没有极限，但它有界；有界因子本身不必收敛。",
    "source": "讲义 §1.2.3（L2777–2785）"
  },
  {
    "id": "BND-03",
    "method": "bounded",
    "difficulty": 2,
    "form": "有界×0",
    "formula": "\\lim_{x\\to\\infty}\\dfrac{\\arctan x}{x}",
    "options": ["bounded", "degree", "important"],
    "hint": "arctan x 有界，1/x 趋于 0。",
    "signals": ["|arctan x|<π/2", "1/x→0"],
    "correctWhy": "arctan x 有界，1/x 是无穷小，所以整体趋于 0。",
    "wrongWhy": {
      "degree": "arctan x 不是多项式，不能按有理式同除最高次；它是有界因子。",
      "important": "这里没有 sin□/□ 或 1^∞ 结构。"
    },
    "steps": [
      {"title": "拆成乘积", "text": "$\\dfrac{\\arctan x}{x}=\\arctan x\\cdot\\dfrac1x$。"},
      {"title": "识别有界因子", "text": "$|\\arctan x|<\\dfrac\\pi2$。"},
      {"title": "取极限", "text": "$\\dfrac1x\\to0$，有界×无穷小，极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "arctan x 本身在 x→∞ 时不存在双侧极限，但这不影响“有界×无穷小”的判断。",
    "source": "讲义 §1.2.3（L2777–2785）"
  },
  {
    "id": "BND-04",
    "method": "bounded",
    "difficulty": 2,
    "form": "有界×0",
    "formula": "\\lim_{n\\to\\infty}\\dfrac{\\cos n}{n+1}",
    "options": ["bounded", "degree", "substitute"],
    "hint": "先把 cos n 和 1/(n+1) 分开看。",
    "signals": ["cos n 有界", "1/(n+1)→0"],
    "correctWhy": "cos n 有界，1/(n+1) 趋于 0，乘积极限为 0。",
    "wrongWhy": {
      "degree": "cos n 不是多项式，不能当作最高次项比较。",
      "substitute": "n→∞ 时 cos n 振荡，不能直接代入。"
    },
    "steps": [
      {"title": "拆因子", "text": "$\\dfrac{\\cos n}{n+1}=\\cos n\\cdot\\dfrac1{n+1}$。"},
      {"title": "分别判断", "text": "$|\\cos n|\\le1$，$\\dfrac1{n+1}\\to0$。"},
      {"title": "结论", "text": "极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "分母是 n+1 而不是 n，但同样是无穷大，所以 1/(n+1) 仍是无穷小。",
    "source": "讲义 §1.2.3（L2777–2785）"
  },
  {
    "id": "BND-05",
    "method": "bounded",
    "difficulty": 2,
    "form": "有界×0",
    "formula": "\\lim_{x\\to+\\infty}e^{-x}\\cos x",
    "options": ["bounded", "degree", "important"],
    "hint": "x→+∞ 时 e^{-x} 趋于 0，cos x 有界。",
    "signals": ["x→+∞ 时 e^{-x}→0", "|cos x|≤1"],
    "correctWhy": "在 x→+∞ 的过程中，e^{-x} 是无穷小，cos x 有界，所以乘积趋于 0。",
    "wrongWhy": {
      "degree": "这不是有理式，不能比较多项式最高次。",
      "important": "没有 sin□/□ 或 1^∞ 结构；关键是识别指数衰减因子和有界三角因子。"
    },
    "steps": [
      {"title": "识别趋零因子", "text": "当 $x\\to+\\infty$ 时，$e^{-x}={1}/{e^x}\\to0$。"},
      {"title": "识别有界因子", "text": "$|\\cos x|\\le1$。"},
      {"title": "结论", "text": "有界×无穷小，极限为 0。"}
    ],
    "answer": "$0$",
    "pitfall": "如果题目是 x→−∞，则 e^{-x}→+∞，会振荡无界；必须先看清是 +∞ 方向。",
    "source": "讲义 §1.2.3（L2777–2785）；§1.4.2 指数函数连续性"
  },
  {
    "id": "MON-01",
    "method": "monotone",
    "difficulty": 2,
    "form": "递推数列",
    "formula": "a_1=1,\\quad a_{n+1}=\\sqrt{2+a_n}",
    "options": ["monotone", "important", "degree"],
    "hint": "先算 a₂、a₃，猜一个上界；再证明单调有界。",
    "signals": ["递推关系 a_{n+1}=√(2+a_n)", "计算前几项会单调上升并靠近 2"],
    "correctWhy": "归纳证明 1≤a_n<2 且数列递增；由单调有界定理得极限存在，再令极限为 A 解方程。",
    "wrongWhy": {
      "important": "递推式没有 sin 或 e 型结构，不能套两个重要极限。",
      "degree": "这不是 n 的显式有理式；不能把 a_n 当成多项式来做最高次比较。"
    },
    "steps": [
      {"title": "观察并猜测界", "text": "$a_1=1$，$a_2=\\sqrt3$，$a_3=\\sqrt{2+\\sqrt3}$，数值逐渐靠近 2。"},
      {"title": "证明有界", "text": "由归纳，若 $a_n<2$，则 $a_{n+1}=\\sqrt{2+a_n}<\\sqrt4=2$；又显然 $a_n>0$。"},
      {"title": "证明单调", "text": "$a_{n+1}^2-a_n^2=2+a_n-a_n^2=(2-a_n)(a_n+1)>0$，所以 $a_{n+1}>a_n$。"},
      {"title": "先得存在", "text": "单调递增且有上界 2，由单调有界定理，极限存在，记为 A。"},
      {"title": "求极限值", "text": "对递推式取极限：$A=\\sqrt{2+A}$，即 $A^2-A-2=0$，得 $A=2$ 或 $A=-1$。因为 $a_n>0$，所以 $A=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "不能一开始就写 A=√(2+A)；必须先证明极限存在，否则就是循环论证。",
    "source": "讲义 §1.3.1（L3181–3224）"
  },
  {
    "id": "MON-02",
    "method": "monotone",
    "difficulty": 2,
    "form": "递推数列",
    "formula": "a_1=1,\\quad a_{n+1}=\\dfrac{a_n+2}{2}",
    "options": ["monotone", "squeeze", "degree"],
    "hint": "证明 a_n<2，再比较 a_{n+1} 与 a_n。",
    "signals": ["线性递推 a_{n+1}=(a_n+2)/2", "不动点方程 L=(L+2)/2 给出 L=2"],
    "correctWhy": "归纳证明 1≤a_n<2 且递增，由单调有界得极限存在，再解 L=(L+2)/2 得 2。",
    "wrongWhy": {
      "squeeze": "没有需要夹逼的 n 项和或振荡项；递推数列应先用单调有界证明存在。",
      "degree": "递推式不是 n 的显式多项式，不能做无穷远最高次比较。"
    },
    "steps": [
      {"title": "证明有界", "text": "若 $a_n<2$，则 $a_{n+1}=\\dfrac{a_n+2}{2}<2$；且 $a_1=1>0$，故 $0<a_n<2$。"},
      {"title": "证明单调", "text": "$a_{n+1}-a_n=\\dfrac{2-a_n}{2}>0$，所以数列递增。"},
      {"title": "得存在并求值", "text": "单调有界，极限存在，记为 A。对递推式取极限：$A=\\dfrac{A+2}{2}$，解得 $A=2$。"}
    ],
    "answer": "$2$",
    "pitfall": "递推式两边取极限之前，必须先由单调有界定理保证 A 存在。",
    "source": "讲义 §1.3.1（L3181–3224）"
  },
  {
    "id": "MON-03",
    "method": "monotone",
    "difficulty": 2,
    "form": "递推数列",
    "formula": "a_1=1,\\quad a_{n+1}=\\sqrt{6+a_n}",
    "options": ["monotone", "substitute", "important"],
    "hint": "猜上界 3；用归纳法证明，再证递增。",
    "signals": ["递推式含根号", "候选极限由 A=√(6+A) 给出 A=3"],
    "correctWhy": "证明数列递增且有上界 3，由单调有界得极限存在，再解 A=√(6+A) 取正根 3。",
    "wrongWhy": {
      "substitute": "n 不是连续变量，不能把某个 n 代入；而且需要先证明极限存在。",
      "important": "没有 sin 或 e 型结构；根号递推不是两个重要极限。"
    },
    "steps": [
      {"title": "证明有界", "text": "若 $a_n<3$，则 $a_{n+1}=\\sqrt{6+a_n}<\\sqrt9=3$；$a_1=1<3$。"},
      {"title": "证明单调", "text": "$a_{n+1}^2-a_n^2=6+a_n-a_n^2=(3-a_n)(a_n+2)>0$，所以递增。"},
      {"title": "先得存在", "text": "单调递增且有上界，极限存在，记为 A。"},
      {"title": "求极限值", "text": "$A=\\sqrt{6+A}$，所以 $A^2-A-6=0$，得 $A=3$ 或 $A=-2$。因 $a_n>0$，取 $A=3$。"}
    ],
    "answer": "$3$",
    "pitfall": "单调有界只保证存在；解二次方程后还要根据正负和界舍去增根。",
    "source": "讲义 §1.3.1（L3181–3224）"
  },
  {
    "id": "MON-04",
    "method": "monotone",
    "difficulty": 3,
    "form": "递推数列",
    "formula": "a_1=1,\\quad a_{n+1}=1+\\dfrac{a_n}{3}",
    "options": ["monotone", "squeeze", "important"],
    "hint": "猜上界 3/2；证明递增且有上界，再取极限。",
    "signals": ["线性递推，系数小于 1", "不动点方程 L=1+L/3 给出 L=3/2"],
    "correctWhy": "归纳证明 a_n<3/2 且递增，由单调有界得极限存在，再解 L=1+L/3 得 3/2。",
    "wrongWhy": {
      "squeeze": "没有和式或振荡项需要夹逼；这是递推数列，应使用单调有界定理。",
      "important": "递推式中没有 sin 或 e 型结构，不能套两个重要极限。"
    },
    "steps": [
      {"title": "证明有界", "text": "若 $a_n<\\dfrac32$，则 $a_{n+1}=1+\\dfrac{a_n}{3}<1+\\dfrac12=\\dfrac32$；$a_1=1$ 满足。"},
      {"title": "证明单调", "text": "$a_{n+1}-a_n=1-\\dfrac{2a_n}{3}>0$，因为 $a_n<\\dfrac32$。"},
      {"title": "得存在并求值", "text": "极限存在，设为 A。$A=1+\\dfrac A3$，所以 $\\dfrac{2A}{3}=1$，$A=\\dfrac32$。"}
    ],
    "answer": "$\\dfrac32$",
    "pitfall": "界不仅要猜对，还要在归纳证明中真正用上；否则不能保证单调性。",
    "source": "讲义 §1.3.1（L3181–3224）"
  },
  {
    "id": "NEX-01",
    "method": "nonexistence",
    "difficulty": 1,
    "form": "不存在",
    "formula": "\\lim_{x\\to0}\\dfrac{\\lvert x\\rvert}{x}",
    "options": ["nonexistence", "substitute", "equivalent"],
    "hint": "分别看 x>0 和 x<0 时的化简结果。",
    "signals": ["含绝对值，0 是分界点", "左右两侧化简结果不同"],
    "correctWhy": "x>0 时值为 1，x<0 时值为 −1，左右极限不等，所以双侧极限不存在。",
    "wrongWhy": {
      "substitute": "代入 x=0 得 0/0，函数在 0 处甚至没有定义，不能直接算。",
      "equivalent": "这里没有趋于 0 的标准无穷小乘除因子；绝对值要先分左右去掉。"
    },
    "steps": [
      {"title": "右极限", "text": "当 $x\\to0^+$ 时，$x>0$，$\\dfrac{|x|}{x}=1$。"},
      {"title": "左极限", "text": "当 $x\\to0^-$ 时，$x<0$，$\\dfrac{|x|}{x}=-1$。"},
      {"title": "比较", "text": "左右极限分别为 1 和 −1，不相等，所以原极限不存在。"}
    ],
    "answer": "不存在（左极限为 $-1$，右极限为 $1$）",
    "pitfall": "左右极限都存在还不够，必须相等；本题正是“存在但不相等”的典型。",
    "source": "讲义 §1.2.2（L2518–2551）"
  },
  {
    "id": "NEX-02",
    "method": "nonexistence",
    "difficulty": 1,
    "form": "不存在",
    "formula": "\\lim_{n\\to\\infty}(-1)^n",
    "options": ["nonexistence", "monotone", "degree"],
    "hint": "看偶数项和奇数项分别趋向什么。",
    "signals": ["数列在 1 和 −1 之间交替", "两个子列给出不同常数"],
    "correctWhy": "偶数项恒为 1，奇数项恒为 −1，两条子列极限不同，所以原数列发散。",
    "wrongWhy": {
      "monotone": "这个数列有界，但它在 1 和 −1 之间振荡，不单调；单调有界定理用不上。",
      "degree": "这里没有 n 的多项式比值，比较最高次没有意义。"
    },
    "steps": [
      {"title": "取偶数项", "text": "$a_{2k}=(-1)^{2k}=1\\to1$。"},
      {"title": "取奇数项", "text": "$a_{2k+1}=(-1)^{2k+1}=-1\\to-1$。"},
      {"title": "结论", "text": "两条子列极限不同，所以原数列的极限不存在。"}
    ],
    "answer": "不存在（两个子列分别趋于 $1$ 和 $-1$）",
    "pitfall": "有界不等于收敛；要否定极限，只需找两条给出不同极限的子列。",
    "source": "讲义 §1.2.1；§1.2.2 归并性原理"
  },
  {
    "id": "NEX-03",
    "method": "nonexistence",
    "difficulty": 2,
    "form": "不存在",
    "formula": "\\lim_{x\\to\\infty}\\arctan x",
    "options": ["nonexistence", "substitute", "squeeze"],
    "hint": "注意 x→∞ 要同时看 x→+∞ 和 x→−∞。",
    "signals": ["x→∞ 是双侧无穷", "arctan 在正负无穷处极限不同"],
    "correctWhy": "x→+∞ 时极限为 π/2，x→−∞ 时为 −π/2，两个方向不等，所以 x→∞ 的极限不存在。",
    "wrongWhy": {
      "substitute": "∞ 不是数，不能直接代入；而且必须比较正、负两个方向。",
      "squeeze": "arctan 虽然有界，但两个方向的趋势不同；夹逼得不到同一个极限值。"
    },
    "steps": [
      {"title": "正方向", "text": "$\\lim\\limits_{x\\to+\\infty}\\arctan x=\\dfrac\\pi2$。"},
      {"title": "负方向", "text": "$\\lim\\limits_{x\\to-\\infty}\\arctan x=-\\dfrac\\pi2$。"},
      {"title": "比较", "text": "两个方向极限不相等，所以按 $x\\to\\infty$ 的定义，原极限不存在。"}
    ],
    "answer": "不存在（正方向为 $\\dfrac\\pi2$，负方向为 $-\\dfrac\\pi2$）",
    "pitfall": "若题目写的是 x→+∞，则极限 π/2 存在；错在忽略了 x→∞ 的双侧要求。",
    "source": "讲义 §1.2.2（L2518–2551）；命题 2.2.2"
  },
  {
    "id": "NEX-04",
    "method": "nonexistence",
    "difficulty": 2,
    "form": "不存在",
    "formula": "\\lim_{x\\to0}\\sin\\dfrac1x",
    "options": ["nonexistence", "substitute", "important"],
    "hint": "找到两条都趋于 0 的路径，让函数值分别等于 0 和 1。",
    "signals": ["1/x 在 0 附近无限振荡", "找不到一个确定的极限值"],
    "correctWhy": "取 x_n=1/(nπ) 得函数值 0，取 y_n=1/(π/2+2nπ) 得函数值 1；两条路径给出的结果不同，所以极限不存在。",
    "wrongWhy": {
      "substitute": "x=0 时 1/x 没有定义，sin(1/x) 也无定义，不能代入。",
      "important": "这不是 sin□/□ 型：1/x 不趋于 0，而且分母没有与 sin 的角配套。"
    },
    "steps": [
      {"title": "路径一", "text": "$x_n=\\dfrac1{n\\pi}\\to0$，$\\sin\\dfrac1{x_n}=\\sin(n\\pi)=0$。"},
      {"title": "路径二", "text": "$y_n=\\dfrac1{\\pi/2+2n\\pi}\\to0$，$\\sin\\dfrac1{y_n}=\\sin(\\pi/2+2n\\pi)=1$。"},
      {"title": "结论", "text": "沿两条都趋于 0 的路径，函数值分别趋于 0 和 1，所以极限不存在。"}
    ],
    "answer": "不存在（在 $-1$ 与 $1$ 之间振荡）",
    "pitfall": "一个路径只能说明“沿这条路会怎样”，不能证明整体极限存在；但两条不同路径足以否定存在。",
    "source": "讲义 §1.2.2 归并性原理；§1.2.1 子列"
  }
];
