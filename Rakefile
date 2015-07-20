# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks


desc 'Seed Database with Users'
task 'db:seed_users' => :environment do
  puts "Now seeding database with 10 users..."
  10.times do |i|
    Faker::Config.locale = 'en-US'
    u = User.new
    u.password = 'password'
    u.first_name = Faker::Name.first_name
    u.last_name = Faker::Name.last_name
    u.email = Faker::Internet.email(u.first_name + ' ' + u.last_name)
    u.save
    puts "User#{i+1} of 10 complete!"
  end
end