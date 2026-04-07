# Architecture Principle

## 基本原則

- 共通UIコンポーネントは `app/components` ディレクトリ以下に配置すること。
- 共通ライブラリは `app/lib` ディレクトリ以下に配置すること。

## ドメイン層

### 基本原則

- `Entity`, `Value Object` および `Domain Service` が対象。
- 他のどの層にも依存してはならない。
- `app/domain` ディレクトリ以下に配置すること。
- ファイル名は `*.entity.ts`, `*.vo.ts` および `*.ds.ts` とすること。

### 例外

- 時刻を扱う場合
  - 時刻の計算には `date-fns` を使用しても良い。
  - ただし、`date-fns` へ依存するのは `Value Object` のみとし、戻り値は必ず標準の `Date` とすること。

## アプリケーション層

### 基本原則

- `UseCase` および `Interface Repository` が対象。
- ドメイン層を除いた全ての層に依存してはならない。
- `app/application` ディレクトリ以下に配置すること。
- ファイル名は `*.usecase.ts` および `*.repository.interface.ts` とすること。

## インフラ層

- `DTO`, `Mapper` および `Repository` が対象。
- `Repository` は必ずアプリケーション層の `Interface Repository` を実装すること。
- `DTO` は必ず `RequestDto` および `ResponseDto` を作成し利用すること。
- `DTO` と `Entity` の変換ロジックは必ず `Mapper` に実装すること。
- `app/infrastructure` ディレクトリ以下に配置すること。
- ファイル名は `*.dto.ts`, `*.mapper.ts` および `*.repository.ts` とすること。

## プレゼンテーション層

- `Component`, `ViewDataMapper` および `ViewData` が対象。
- `UseCase` を使用する場合の責務分割は、`Custom Hook` ではなく `Container / Presentational パターン` を採用し、`Container Component` で `UseCase`を扱い、`Presentational Component` は表示のみを行うように実装すること。
- 外部との通信を行わないUI自体の状態管理については `Custom Hook` を採用すること。
- `Entity` と `ViewData` の変換ロジックは必ず `ViewDataMapper` に実装すること。
- `UseCase` から返された `Entity` を利用する場合は、必ず `ViewDataMapper` を使用して `ViewData` に変換して使用すること。
- `Presentational Component` は `ViewData` またはプリミティブ型を `props` として受け取るようにすること。（責務分割および変更容易性の観点から `Entity` などは直接利用しないこと）
- 画面別に `app/presentation/{page}` ディレクトリ以下に配置すること。
- TSXファイル名は `*.container.tsx` および `*.presentational.tsx` とすること。
- TSファイル名は `*.vd.ts` および `*.vd-mapper.ts` とすること。
