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
    p.account = User.all.sample
    p.save
    puts "Post#{i+1} of 100 complete!"
  end
end

desc 'Seed Database with Events'
task 'db:seed_events' => :environment do
  puts "Now seeding database with 10 events..."
  topics = %w[animals cars nature cities]
  10.times do |i|
    n = [*0...User.all.length].sample
    Faker::Config.locale = 'en-US'
    e = Event.new
    e.creator_id = User.all[n].id
    e.name = Faker::Company.bs.titleize
    e.event_type = 'social'
    e.start_time = Time.new
    e.about = Faker::Lorem.paragraph(12)
    address = Faker::Address.new
    e.location = JSON.load(open('https://randomuser.me/api/'))['results'][0]['user']['location']
    5.times { e.attendees << User.all.sample }
    suckr = ImageSuckr::GoogleSuckr.new
    e.cover = suckr.get_image_url({'q' => topics.sample, 'imgsz' => 'xxlarge' })
    e.save
    puts "Event#{i+1} of 10 complete!"
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
    users = User.all - [post.account]
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

desc 'Seed Follower Relationships'
task 'db:seed_follows' => :environment do
  puts "Now seeding follow relationships..."
  User.all.each_with_index do |user, i|
    users = User.all - [user]
    [*6..15].each{ |n| user.follow!(users.sample) }

    puts "User#{i+1} of #{User.all.size} complete!"
  end

end

desc 'Seed Comment Likes'
task 'db:seed_comment_likes' => :environment do
  puts "Now seeding comment likes..."
  Comment.all.each_with_index do |comment, i|
    [*0..8].each{ |n| User.all.sample.like!(comment) }
    puts "Comment#{i+1} of #{Comment.all.size} complete!"
  end
end

desc 'Seed Businesses'
task 'db:businesses' => :environment do
  Business.create(name: 'Ulysses NYC',neighborhood: Neighborhood.all[0] ,contact: { street: '95 Pearl Street', city: 'New York', state: 'NY', phone: '2124820400', website: 'http://www.ulyssesnyc.com/'}, user: User.all[-1] , established: Date.new(2001,2,15), industry: 'Restaurant/Bar', avatar: Faker::Avatar.image.gsub("http", "https"), cover:'http://guestofaguest.com/wp-content/uploads/2013/11/01-stonestreet_v3_460x285.jpg')
  Business.create(name: 'Cipriani Wall Street',neighborhood: Neighborhood.all[0] ,contact: { street: '55 Wall Street', city: 'New York', state: 'NY', phone: '21269940999', website: 'http://www.cipriani.com'}, user: User.all[-2] , established: Date.new(2001,2,15), industry: 'Restaurant' , avatar: Faker::Avatar.image.gsub("http", "https"), cover: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xta1/t31.0-8/1519650_889867514413049_851333459850627548_o.jpg' )
  Business.create(name: 'Stone Street Tavern',neighborhood: Neighborhood.all[0] ,contact: { street: '52 Stone Street', city: 'New York', state: 'NY', phone: '2127855658', website: 'http://www.stonestreettavernnyc.com'}, user: User.all[-3] , established: Date.new(2001,2,15), industry: 'Restaurant' , avatar: Faker::Avatar.image.gsub("http", "https"), cover: 'http://s3-media3.fl.yelpcdn.com/bphoto/ZZWPIMMAWzGH65hAbuBugw/o.jpg' )
  Business.create(name: 'Balthazar',neighborhood: Neighborhood.all[1] ,contact: { street: '80 Spring Street', city: 'New York', state: 'NY', phone: '2129651414', website: 'http://www.balthazarny.com'}, user: User.all[-4] , established: Date.new(2001,2,15), industry: 'Restaurant' , avatar: Faker::Avatar.image.gsub("http", "https"), cover: 'http://www.nolitahearts.com/wp-content/uploads/2015/01/balthazar-restaurant-nolita.jpg')
  Business.create(name: 'SoHo Cigar Bar',neighborhood: Neighborhood.all[1] ,contact: { street: '32 Watts Street', city: 'New York', state: 'NY', phone: '2129411781', website: 'http://www.sohocigarbar.com'}, user: User.all[-5] , established: Date.new(2001,2,15), industry: 'Bar', avatar: Faker::Avatar.image.gsub("http", "https"), cover: 'http://static1.squarespace.com/static/54ac275ee4b0a61122e8ea07/54d8e917e4b00cfd8b1760f3/54d8ec3be4b0e669a5507b53/1423502396777/Bar.jpg')
  Business.create(name: 'Owen',neighborhood: Neighborhood.all[1] ,contact: { street: '809 Washington Street', city: 'New York', state: 'NY', phone: '2125249770', website: 'http://www.owennyc.com'}, user: User.all[-6] , established: Date.new(2001,2,15), industry: 'Retail' , avatar: Faker::Avatar.image.gsub("http", "https"), cover: 'https://s-media-cache-ak0.pinimg.com/736x/9a/44/ed/9a44edf04045a38a3a1da286f7b5bf17.jpg')
end



