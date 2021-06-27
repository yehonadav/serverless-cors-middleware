import {AsyncHandler} from '@yehonadav/lambdahttp';
import {CORS} from "./allowedCorsList";

export const addCorsToResponseMiddleware = (handler:AsyncHandler):AsyncHandler => async (
  event,
  context,
  callback,
) =>
{
  const response = await handler(event, context, callback);

  const origin = event.headers?.origin;

  if (CORS.includes(origin)) {
    if (!response.headers)
      response.headers = {};

    response.headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
      ...response.headers,
    };
  }

  return response;
}