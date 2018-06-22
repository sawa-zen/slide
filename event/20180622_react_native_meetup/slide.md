footer: @sawa-zen (2018/6/22) react-native-meetup

![fit](background.png)

## **デザインガイドラインを作る<br>Webサービスを作っている話**

#### Merpay, Inc フロントエンドエンジニア<br>@sawa-zen

---

![fit](background.png)

# [fit] @sawa-zen

所属：Merpay, Inc
職種：フロントエンドエンジニア/インタラクションデザイナー

Three.js
React
SketchApp
Blender
YouTuber大好き

![left 30%](sawa-zen.png)

---

![fit](background.png)

## **react-primitivesって<br>知ってますか？**

---

![fit](background.png)

## react-primitivesとは？

  - プラットフォーム毎のAPIに左右されず共通で使用できるインターフェース
  - **以下のrenderに対して同じコードでViewが作れる**
    - **react-dom**
    - **react-native**
    - **react-sketchapp**

---

![fit](background.png)

## 機能
  - View: レイアウトのためのコンポーネント
  - Text: テキストのためのコンポーネント
  - Image: 画像のためのコンポーネント
  - Touchable: インタラクションのためのコンポーネント
  - StyleSheet: ReactNative の StyleSheet と同じ
  - Animated: Viewにアニメーションを追加するためのコンポーネント

---

![fit](background.png)

## 想定しうる実用例

### **デザイン段階でコードでUIを作成し<br/>コンポーネントをエンジニアに共有する**

---

![fit](background.png)

![inline](./paper_1.png)

---

![fit](background.png)

## やってみた!!

---

![fit](background.png)

![inline](https://video.twimg.com/tweet_video/DUdaXwGVoAASaeV.mp4)

---

![fit](background.png)

![inline](https://video.twimg.com/tweet_video/DPZwyaIVQAYEqo1.mp4)

---

![fit](background.png)

# 感想

- 複雑なViewの場合若干の見た目の差異が気になる
- デザイナーさんにこのコード書かせるのは酷
- 型定義ファイルが無くて不安

---

![fit](background.png)

# 感想

- 複雑なViewの場合若干の見た目の差異が気になる
- デザイナーさんにこのコード書かせるのは酷
- 型定義ファイルが無くて不安

  **=> C向けのプロダクトには実用的ではない**

---

![fit](background.png)

## 他に用途は無いものか<br>🤔

---

![fit](background.png)

# どういう用途であれば使えそうか？

- 複雑なViewを必要としない
- 堅牢さを必要としない
- デザイナーさんがコードを書く必要がない

---

![fit](background.png)

# 業務効率化ツールであればいけるのでは?<br>🤔

---

![fit](background.png)

## ここからが本題

---

![fit](background.png)

# こんな物を作り始めました

**スタイルガイドラインをWeb上で作成できるツール**

- SketchのプラグインとしてViewを書き出せる
- ガイドラインに関わる情報をjsonで書き出せる
  - カラー
  - テキストスタイル
  - etc...

---

![fit](background.png)

![inline](./paper_2.png)

---

![fit](background.png)

# DEMO

---

![fit](background.png)

# 何が良いのか

- デザイナーがGUI操作で扱える
- jsonとして値がもらえる
  - Viewライブラリに制限されない
  - JSでなくても扱える

---

![fit](background.png)

# 何が良いのか

- デザイナーがGUI操作で扱える
- jsonとして値がもらえる
  - Viewライブラリに制限されない
  - JSでなくても扱える

  **=> react-primitivesが無駄にならない！**

---

![fit](background.png)

# 今後の展望

- 各編集機能
- font-famiryパターン
- marginパターン
- border-radiusパターン
- jsonのimport機能


