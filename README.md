# studio-pastel.jp（Next.js版）

WordPress（wp-theme + wp-export.xml）から、TypeScript + React（Next.js）の静的サイトに移行しました。
デザイン・文言・Works一覧（31件）はすべて現状のサイトと同じ内容です。

---

## ☀️ 朝起きたらやること（5〜10分）

1. **GitHubリポジトリを作成してpush**
   ```bash
   cd "このフォルダ"
   git init -b main   # すでにgit initしてある場合は不要
   git add .
   git commit -m "Initial commit: migrate WordPress site to Next.js"
   gh repo create studio-pastel-jp --private --source=. --remote=origin
   # ghコマンドが無ければ、GitHub上で先にリポジトリを作ってから↓
   # git remote add origin git@github.com:<your-account>/studio-pastel-jp.git
   git push -u origin main
   ```

2. **GitHub Pagesを有効化**
   - リポジトリの Settings → Pages → Source を「GitHub Actions」に設定
   - pushすると自動的に `.github/workflows/deploy.yml` が動いてビルド・公開されます

3. **独自ドメイン（studio-pastel.jp）を設定**
   - `public/CNAME` に `studio-pastel.jp` を入れてあるので、GitHub Pages側の設定は自動で反映されます
   - ドメインのDNS（現在お使いのドメイン管理画面）で、GitHub Pagesの案内に従って
     `A`レコード（GitHub PagesのIPアドレス）または`CNAME`レコードを設定してください
     （参考: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site ）
   - 今まで studio-pastel.jp を向けていたWordPressのホスティング（Xserverなど）は、
     切り替え確認ができてから解約してください

4. **お問い合わせフォームを有効化（任意・推奨）**
   - 今のままだと「送信」ボタンを押すとメールソフトの下書きが開く形（フォールバック）になっています
   - [Formspree](https://formspree.io) で無料アカウントを作り、フォームを1つ作成 → フォームID（`xxxxxxx`の部分）を取得
   - GitHubリポジトリの Settings → Secrets and variables → Actions → Variables タブで
     `NEXT_PUBLIC_FORMSPREE_ID` という名前で登録
   - 再度pushするか、Actionsタブから再実行すると反映されます

以上で完了です。

---

## 今回の移行で分かったこと（重要）

- **`wp-export.xml` には Works（実績）の投稿データが含まれていませんでした。**
  カスタム投稿タイプ「works」がエクスポートに入っておらず、代わりに古いブログ下書き（2014年〜、非公開）や
  お問い合わせ履歴（flamingo）などが大半でした。
  そのため、Works 31件（タイトル・役割・本文・クレジット・画像）は **現在公開中の studio-pastel.jp から直接取得**して
  `content/works/*.md` に変換しています。内容は現在のサイトと一致しているはずですが、
  念のため公開後に一通りご確認ください。
- 古いブログ記事（116件、ほとんど下書き）は現行テーマにブログ機能自体が無いため移行していません。
  将来ブログを作る場合は改めてご相談ください。

---

## Worksページの更新方法（今回いちばん楽にしたかった部分）

Works の追加・編集は WordPress 管理画面の代わりに、**Markdownファイル1つ + 画像フォルダ**で行います。

### 方法A: 対話式スクリプトで追加（おすすめ）

```bash
npm run new-work
```

タイトル・役割コード・クレジットを聞かれるので入力すると、
`content/works/<slug>.md` と `public/images/works/<slug>/` が自動生成されます。
あとは画像フォルダに写真を入れて、Markdownファイルを開いて本文や画像パスを整えるだけです。

### 方法B: テンプレートをコピーして手動で追加

1. `content/works/_template.md` をコピーして `content/works/新しい作品名.md` を作成
2. `public/images/works/新しい作品名/` フォルダを作って画像を入れる
3. frontmatter（先頭の `---` で囲まれた部分）の `title` `roles` `thumbnail` `credit` を書き換える
4. 本文は段落ごとに空行区切り、画像は `![](/images/works/.../ファイル名.jpg)` の形式で好きな位置に挿入

### 公開する

```bash
git add .
git commit -m "add work: 作品名"
git push
```

pushするだけで、GitHub Actionsが自動的にビルド・公開します（1〜2分程度）。

### 役割コード一覧

`ED`編集 / `CD`クリエイティブディレクション / `PL`プランニング / `CM`コンセプトメイキング /
`CW`コピーライティング / `WR`ライティング / `GD`グラフィックデザイン / `WD`WEBディレクション / `OT`その他

---

## ローカルで確認する

```bash
npm install
npm run dev
# http://localhost:3000 を開く
```

ビルド確認（実際にデプロイされる静的ファイルを生成）:

```bash
npm run build
# out/ フォルダに静的HTMLが出力される
```

---

## 構成

```
app/                Next.js のページ（App Router）
components/          Header / Footer / ContactForm
content/works/       Works記事（Markdown、これが実質のCMS）
lib/                 Markdownの読み込み処理
public/              画像・favicon・CNAMEなど静的ファイル
scripts/new-work.mjs 新規Works追加の対話式スクリプト
legacy-wordpress/    旧WordPressテーマとエクスポートXML（参照用に保存。サイトの動作には無関係）
.github/workflows/   GitHub Pagesへの自動デプロイ設定
```

---

## 今後の検討事項（急ぎではありません）

- **TypeSquare / Xserverの Webフォント**: 現状のフォント（中ゴシックBBB等）はTypeSquare社の有料サービス経由で
  読み込んでいます（`app/layout.tsx` 内のスクリプトタグ）。WordPressホスティング（Xserver）を解約すると、
  この契約も一緒に終了する可能性があるので確認してください。終了した場合、サイトは壊れませんが、
  日本語フォントが標準のゴシック体にフォールバックし見た目が少し変わります。
- **画像の最適化**: Works画像フォルダが合計 約81MB あります（WordPress書き出しサイズをそのまま使用）。
  容量・表示速度が気になる場合は、後日まとめて圧縮・WebP化を検討してください。
- **npm の依存パッケージに軽微な脆弱性警告（PostCSS, ビルド時のみ・実害なし）が出ています。**
  次回のメンテナンス時に `npm audit` を確認してください。
