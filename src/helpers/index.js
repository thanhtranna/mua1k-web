// @flow weak
import $ from 'jquery';

export const getLocationOrigin = () => {
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
  }
  return window.location.origin;
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 500) {
    return response;
  } else {
    const error: any = new Error(response.statusText);
    error.response = response;
    // throw error;
    return Promise.reject(error);
  }
};

export const parseJSON = (response) => {
  return response.json();
};

export const getNewRequestNoBody = (url: string, method: string, token = null, headers = {}) => {
  let originHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token
  };
  let customHeaders = Object.assign(headers, originHeaders);
  const request = new Request(url, {
    method,
    headers: customHeaders
  });
  return request;
};

export const getNewRequestHasBody = (url: string, method: string, data: any, token = null, headers = {}) => {
  let originHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token
  };

  if (data instanceof FormData) {
    delete originHeaders['Content-Type'];
  }

  let customHeaders = Object.assign(headers, originHeaders);
  const request = new Request(url, {
    method,
    headers: customHeaders,
    body: data instanceof FormData ? data : JSON.stringify(data)
  });
  return request;
};

export const dateTimeFormatter = (dateTime: string) => {
  if (dateTime === null || dateTime === undefined) return '---';
  return dateTime.substring(0, 19).replace('T', ' ');
};

export const dateFormatter = (date: string) => {
  if (date === null || date === undefined) return '---';
  return date.substring(0, 10);
};

export const imagesPreview = (image, placeToInsertImagePreview) => {
  $(placeToInsertImagePreview + ' img').remove();
  if (image) {
    let reader = new FileReader();

    reader.onload = function (event) {
      $($.parseHTML('<img class="img-responsive img-thumbnail" width="250px" height="250px">'))
        .attr('src', event.target.result)
        .prependTo(placeToInsertImagePreview);
    }

    reader.readAsDataURL(image);
  } else {
    //TODO
  }
}

export function activeRoute(routeName, pathRootName) {
  return pathRootName.endsWith(routeName) ? "active" : "";
}

export function checkUndefined(value) {
  return (value !== undefined) ? value : null;
}

export function truncateText(text, maxLength = 50) {
  if (text === undefined || text === null)
    return null;
  if (text.length > maxLength) {
    text = text.substr(0, maxLength) + '...';
  }
  return text;
}