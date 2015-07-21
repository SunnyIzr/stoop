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


desc 'Seed Database with Posts'
task 'db:seed_posts' => :environment do
  puts "Now seeding database with 100 posts..."
  100.times do |i|
    Faker::Config.locale = 'en-US'
    p = Post.new
    p.body = Faker::Company.catch_phrase
    p.user = User.all.sample
    p.save
    puts "Post#{i+1} of 100 complete!"
  end
end

desc 'Seed Database with Events'
task 'db:seed_events' => :environment do
  puts "Now seeding database with 10 events..."
  10.times do |i|
    Faker::Config.locale = 'en-US'
    e = Event.new
    e.creator_id = User.all[i].id
    e.name = "Event #{i}"
    e.event_type = 'social'
    ids = [*0..9] - [i]
    ids.shuffle!
    5.times { e.attendees << User.all[ids.pop] }
    e.save
    puts "Evebt#{i+1} of 10 complete!"
  end
end