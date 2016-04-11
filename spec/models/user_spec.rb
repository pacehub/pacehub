require 'rails_helper'

describe User do
  context "User sign up" do
    let :user do
      FactoryGirl.create(:user)
    end
    
    it "has a valid factory" do
      expect(user).to be_valid
    end

    it "has a unique email" do
      user2 = user.dup
      expect(user2).to be_invalid
    end

    it "has first name and last name" do
      user3 = User.new(
        first_name: nil,
        last_name: nil,
        email: 'foo@bar.com',
        password: 'HelloWorld'
      )
      expect(user3).to be_invalid
    end

    it "returns's full name as a string" do
      expect(user[:name]).to eq("John Doe")
    end
  end
end