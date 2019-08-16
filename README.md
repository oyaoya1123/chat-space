# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|

### Association
- has_many :groups_users
- has_many :messages
- has_many :groups, through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|user_id|ineteder|null: false|

### Association
- belongs_to :user
- belongs_to :group

### index
- add_index :group_id

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|user_id|ineteder|null: false|
|body|text|null: false|
|image|string||

### Association
- belongs_to :user
- belongs_to :group

### index
- add_index :group_id

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :groups_users
- has_many :messages
- has_many :users, through: :groups_users