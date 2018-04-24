footer: @sawa-zen (2018/4/22) Roppongi.js
slidenumbers: true

![fit](background.png)

# React Sketch.appで<br>デザインガイドラインを作ってみた

---

![fit](background.png)

# @sawa-zen

所属：株式会社メルペイ
役職：フロントエンドエンジニア/インタラクションデザイナー

Three.js
React
SketchApp
Blender
YouTuber大好き

![left 30%](sawa-zen.png)

---

![](background.png)

# React Sketch.appって知ってる？

![inline 180%](sketchapp.png)

---

![fit](background.png)

# React Sketch.appとは

- ReactでSketchデザインを扱えるツール
- airbnb社のOSS
- Sketchプラグインを書き出せる
- 記法はほぼReactNativeと同じ

---

![fit](background.png)

```javascript
import React from 'react';
import { View, Text, render } from 'react-sketchapp';

export default function(context) {
  render(
    <View>
      <Text>Sample Text</Text>
    </View>,
    context.document.currentPage()
  );
}
```

---

![fit](background.png)

# React Sketch.appはいい事だらけ!!

- コードなのでバージョン管理できて最高 :+1:
- デザイン修正もコードレビューできて最高 :+1:
- エンジニアでもデザイン修正できて最高 :+1:


---

![fit](background.png)

# React Sketch.appはいい事だらけ!!

- コードなのでバージョン管理できて最高 :+1:
- デザイン修正もコードレビューできて最高 :+1:
- エンジニアでもデザイン修正できて最高 :+1:

# **全部これで書けばいいのに** :innocent:

---

![fit](background.png)

# ほんとに？

---

![fit](background.png)

# React Sketch.appはそんな甘くない!!

- デザイナーもJSを覚える必要がある :-1:
- デザインとクライアントの二度手間実装 :-1:
- 直感的にデザインできない :-1:

---

![fit](background.png)

# 全てReactはしんどい...<br>:innocent: :innocent: :innocent:

---

![fit](background.png)

## デザインガイドラインだけなら...？

---

![original fit](style_guide.png)

---

![fit](background.png)

![inline fit](style_guide.png)

# **Reactで書いてみました** :muscle:

---

![fit](background.png)

# Reactでガイドラインを<br>作ってみて良かったこと

---

# ① スタイルがコードとして共有できる :ok_woman:

nodeモジュールとして共有すればスタイルをコードして扱える

- color
- font-size, font-weight
- margin, padding
- etc...

---

![fit](background.png)

# ② プラグインとして共有できる :ok_woman:

プラグインを実行するだけで以下２つがセットで生成できるため、プロジェクトを跨いだデザインの統一化を図りやすい。

- スタイルガイドライン
- シンボル

---

![fit](background.png)

# ③ 単純作業が多いので向いている :ok_woman:

繰り返しViewを並べる作業が多いのでコードで表現する方が速い

![inline fit](colors.png)

---

![fit](background.png)

# ④ 無駄なシンボルが残らない :ok_woman:

効率化の為に作成していたシンボルがコードに置換できる

![inline fit](symbols.png)

---

![fit](background.png)

# 課題

- コンポーネントの細かなデザインからはエンジニアでは難しい
- デザイナーさんと密なコミュニケーションが必須
- 結局JSをデザイナーさんも触る可能性がある
- そもそも作ってる余裕が無い事が多い

---

![fit](background.png)

# でも手応えはあった :+1:

---

![fit](background.png)

# もっとプロダクトのUIを<br>良くしていきたい！

---

![fit](background.png)

# 実業務に導入するためには？

---

![fit](background.png)

# [fit] **UIの信頼性向上を担う<br>新部署の爆誕しかない！**

---

![fit](background.png)

# ~~Site Reliability Engineering（SRE）~~

# ↓

# [fit] **UI Reliability Engineering<br>（URE）**

---

![fit](background.png)

# [fit] **弊社に新部署設立検討<br>お願いします！**<br> :bow: :bow:
