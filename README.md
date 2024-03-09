# Momo Contact

Go to [https://misa198.github.io/momo-contact/](https://misa198.github.io/momo-contact/) to see the application.

## Description

The application is developed using ReactJS, with an interface similar to the image below.

![ui.png](docs%2Fui.png)

It is a simple contact list application that allows:

- Fetching contacts from "https://www.mockachino.com/17acefab-0956-47/contacts'
- Displaying the contacts in a list.
- Searching for contacts by name or phone number, regardless of case, Vietnamese with or without accents.
- Add or remove contacts from favourites list.

### Implement cache

The application can be cached to increase performance but requires the api to provide "Headers" for control. Or the cache is implemented on the Server side. The current API does not return any headers, intentional caching may cause data to be out of date.

### Offline mode

The application can work offline. The application has been implemented as PWA. The latest response of the contact list API is saved for offline use. When the application switches from offline to online status, the application will be refreshed.

### Loading state

The application uses Redux's RTK to manage contact queries. It supports checking the loading status of each query.

### Dealing with large data

- If the data is not too large, it can all be returned to the client, and a "virtual list" can be implemented for the frontend.
- If the data is too large:
  - Search and pagination are implemented on the server side.
  - Using server-side caching to improve performance.
  - Using a search engine as Elastic Search to search for contacts.

### Unit test

N/A

### Installation

```bash
$ yarn install
$ yarn dev
```

## Libraries

- ReactJS
- Redux Toolkit
- Tailwind CSS
