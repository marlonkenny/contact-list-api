class Contact < ActiveRecord::Base
  validates :first_name, :last_name,
    presence: :true

  validates :email, 
            uniqueness: true,
            format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i }, 
            allow_blank: true
end