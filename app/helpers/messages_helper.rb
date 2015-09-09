module MessagesHelper
  def recipients_options(chosen_recipient=nil)
    s = ''
    User.neighbors.each do |user|
      s << "<option value='#{user.id}' data-img-src='#{user.avatar}' #{'selected' if user == chosen_recipient}>#{user.name}</option>"
    end
    s.html_safe
  end
end