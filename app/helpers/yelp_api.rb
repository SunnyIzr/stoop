module YelpApi
  extend self
  def search(term,location)
    Yelp.client.search(location,{term: term})
  end
  
  def search_by_coords(term,coords)
    Yelp.client.search_by_coordinates( { latitude: coords[0], longitude: coords[1] }, { term: term, limit: 10 } )
  end
  
  def business(id)
    Yelp.client.business(id)
  end
end