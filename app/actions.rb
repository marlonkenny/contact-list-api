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
  contact = Contact.find(params[:id])
  if contact.update(
    first_name:   params[:first_name],
    last_name:    params[:last_name],
    email:        params[:email],
    phone_number: params[:phone_number]
    )
    [200, {}, '']
  else
    [400, {}, contact.errors.messages.to_json]
  end
end

delete '/contacts/:id' do
  contact = Contact.find(params[:id])
  if contact.destroy
    [200, {}, '']
  else
    [400, {}, contact.errors.messages.to_json]
  end
end

# GET /contacts
get '/contacts' do
  contacts = Contact.all
  json data: contacts
end