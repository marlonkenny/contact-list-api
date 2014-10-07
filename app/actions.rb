# Homepage (Root path)
get '/' do
  erb :index
end

# POST /contacts
post '/contacts' do
  contact = Contact.new(
    first_name:   params[:first_name],
    last_name:    params[:last_name],
    email:        params[:email],
    phone_number: params[:phone_number]
    )
  if contact.save
    [200, {}, '']
  else
    [400, {}, contact.errors.messages.to_json]
  end
end

# PUT /contact/:id 
put '/contacts/:id' do
  content_type :json
  { :key1 => 'value1', :key2 => 'value2' }.to_json
end

# GET /contacts
get '/contacts' do
  @contacts = Contact.all
  json data: @contacts
end