# Architecture Principle

## 基本原則

- 共通UIコンポーネントは `app/components` ディレクトリ以下に配置すること。
- 共通ライブラリは `app/lib` ディレクトリ以下に配置すること。

## ドメイン層

### 基本原則

- `Entity`, `Value Object` および `Domain Service` が対象。
- 他のどの層にも依存してはならない。
- `app/domain` ディレクトリ以下に配置すること。

### 例外

- 時刻を扱う場合
  - 時刻の計算には `date-fns` を使用しても良い。
  - ただし、`date-fns` へ依存するのは `Value Object` のみとし、戻り値は必ず標準の `Date` とすること。

## アプリケーション層

### 基本原則

- `UseCase` および `Interface Repository` が対象。
- ドメイン層を除いた全ての層に依存してはならない。
- `app/application` ディレクトリ以下に配置すること。

## インフラ層

- `DTO`, `Mapper` および `Repository` が対象。
- `Repository` は必ずアプリケーション層の `Inteface Repository` を実装すること。
- `DTO` は必ず `RequestDto` および `ResponseDto` を作成し利用すること。
- `DTO` と `Entity` の変換ロジックは必ず `Mapper` に実装すること。
- `app/infrastructure` ディレクトリ以下に配置すること。

## プレゼンテーション層

- `Component` が対象。
- `UseCase` を使用する場合の責務分割は、`Custom Hook` ではなく `Container / Presentational パターン` を採用し、`Container Component` で `UseCase`を扱い、`Presentational Component` は表示のみを行うように実装すること。
- 外部との通信を行わないUI自体の状態管理については `Custom Hook` を採用すること。
- 画面別に `app/presentation/{page}` ディレクトリ以下に配置すること。
