# 実装計画書

## Phase 1（プレゼンテーション層のモック実装）

- 基本画面（ダッシュボード、企業情報追加、タスク一覧、タスク追加、スカウト一覧）を実装する。
- 表示するデータは モック用の `ViewData` を作成して対応すること。
- このフェーズでは `プレゼンテーション層` のみを実装し、そのほかの実装は行わないこと。
- このフェーズではテストは実施しなくてよい。

## Phase 2（ドメイン層およびアプリケーション層の実装）

- 各 `Entity`, `Value Object`, `Domain Service` を実装する。
- 実装した `Entity` に基づいて、アプリケーション層（`UseCase`, `Interface Repository`）およびプレゼンテーション層の `ViewDataMapper` を実装する。
- 最後に、UI層で `UseCase` を利用するように実装を修正する。
- このフェーズでは `インフラ層` の実装は行わないこと。
- UIに表示するデータは `Entity` および `Value Object` のモックデータを作成し、`ViewDataMapper` で `ViewData` に変換することで対応すること。
- 必ず単体テストを実施すること。
- このフェーズはDB設計が完了した後から着手可能である。

## Phase 3（インフラ層の初期実装）

- 各 `DTO`, `Mapper` および アプリケーション層の `Interface Repository` を満たす `Repository` を実装する。
- リモート（`Neon` や `Identity Platform` など）との通信を永続化する。
- このフェーズでは `Indexed DB` を使用したキャッシュ機構は実装しない。

## Phase 4（インフラ層の追加実装）

- `Repository` に `Indexed DB` を用いたキャッシュ機構を組み込む。
- パフォーマンス向上が目的である。
