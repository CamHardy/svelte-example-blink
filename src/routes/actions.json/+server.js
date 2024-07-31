import {
    ACTIONS_CORS_HEADERS
} from '@solana/actions';

/** @type {import('./$types').RequestHandler} */
export function GET() {
    return Response.json({
        rules: [
            {
                pathPattern: '/',
                apiPath: '/api/donate/'
            }
        ]
    }, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;