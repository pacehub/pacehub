# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160317063913) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "directions", force: :cascade do |t|
    t.integer  "origin_id",      null: false
    t.integer  "destination_id", null: false
    t.decimal  "distance"
    t.datetime "start_time",     null: false
    t.datetime "end_time"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "places", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "address"
    t.string   "name"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "mobile_number"
    t.string   "last_name"
    t.string   "first_name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "login_count"
    t.datetime "last_login_at"
    t.boolean  "active"
    t.string   "password_digest"
    t.string   "password"
    t.string   "remember_digest"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  create_table "users_places", force: :cascade do |t|
    t.integer "user_id",  null: false
    t.integer "place_id", null: false
    t.string  "name"
  end

  add_index "users_places", ["place_id"], name: "index_users_places_on_place_id", using: :btree
  add_index "users_places", ["user_id"], name: "index_users_places_on_user_id", using: :btree

end
