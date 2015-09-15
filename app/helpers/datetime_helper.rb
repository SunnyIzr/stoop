module DatetimeHelper
  extend self
  def hour(meridian,hour)
    if hour == '12'
      new_hour = (meridian == 'pm') ? 12 : 0
    else
      new_hour = (meridian == 'pm') ? (hour.to_i + 12) : hour
    end
    return new_hour
  end
  def change_meridian(hour,new_meridian)
    if new_meridian == 'am'
      hour.to_i - 12
    else
      hour.to_i + 12
    end
  end
end