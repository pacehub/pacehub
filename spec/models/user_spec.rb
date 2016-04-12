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
      new_user = user.dup
      expect(new_user).to be_invalid
    end

    it "has first name and last name" do
      new_user = User.new(
        first_name: nil,
        last_name: nil,
        email: 'foo@bar.com',
        password: 'HelloWorld'
      )
      expect(new_user).to be_invalid
    end

    it "returns's full name as a string" do
      expect(user[:name]).to eq("John Doe")
    end

    it "has a valid password" do
      new_user = user.dup
      new_user.password = "12345"
      expect(new_user).to be_invalid
    end

    it "saves email as lower case" do
      mixed_case_email = 'FoO@bAr.coM'
      new_user = User.create(
        first_name: "new",
        last_name: "user",
        email: mixed_case_email,
        password: 'HelloWorld'
      )
      expect(new_user.email).to eq(mixed_case_email.downcase)
    end
  end
end
