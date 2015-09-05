# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks


desc 'Seed Database with Users'
task 'db:seed_users' => :environment do
  puts "Now seeding database with 10 users..."
  10.times do |i|
    user_data = JSON.load(open('https://randomuser.me/api/'))['results'][0]['user']
    u = User.new
    u.password = 'password'
    u.first_name = user_data['name']['first'].capitalize
    u.last_name = user_data['name']['last'].capitalize
    u.email = user_data['email']
    u.gender = user_data['gender']
    u.avatar = user_data['picture']['large']
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

desc 'Seed Posts with Image'
task 'db:seed_post_images' => :environment do
  puts "Now seeding posts with random images..."
  topics = %w[animals cars nature cities]
  suckr = ImageSuckr::GoogleSuckr.new
  Post.all.each_with_index do |post,i|
    if [true,false].sample
      post.image = suckr.get_image_url({'q' => topics.sample })
      post.save
      puts "Post#{i+1} of #{Post.all.size} complete!"
    end
  end
end

desc 'Seed Posts with Random Comments and Likes'
task 'db:seed_comments_likes' => :environment do
  puts "Now seeding posts with comments and likes..."
  Post.all.each_with_index do |post,i|
    users = User.all - [post.user]
    [*0..10].sample.times do |i|
      post.comments.create(user: users.sample, comment: Faker::Lorem.sentence(1))
    end
    [*0..25].sample.times do |i|
      users.sample.like!(post)
    end
    puts "Post#{i+1} of #{Post.all.size} complete!"
  end
end

desc 'Seed Users with About Copy and Cover Image'
task 'db:seed_abouts_covers' => :environment do
  puts "Now seeding users with abouts and cover images..."
  topics = %w[animals cars nature cities]
  User.all.each_with_index do |user,i|
    user.about = Faker::Lorem.paragraph(12)
    suckr = ImageSuckr::GoogleSuckr.new
    user.cover = suckr.get_image_url({'q' => topics.sample, 'imgsz' => 'xxlarge' })
    user.save
    puts "User#{i+1} of #{User.all.size} complete!"
  end
end

desc 'Seed Buildings & Neighborhoods'
task 'db:seed_buildings_neighborhoods' => :environment do
  puts "Now seeding buildings and neighborhoods..."
  fidi = Neighborhood.create(name: 'Financial District')
  Building.create(name: '15 William Street', neighborhood: fidi)
  Building.create(name: '50 West Street', neighborhood: fidi)
  
  soho = Neighborhood.create(name: 'SoHo')
  Building.create(name: '150 Thompson Street', neighborhood: soho)
  Building.create(name: '35 Bond Street', neighborhood: soho)
  
  User.all.each do |user|
    user.update!(building: Building.all.sample)
  end
end



