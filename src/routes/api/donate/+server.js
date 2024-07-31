import { 
    ACTIONS_CORS_HEADERS,
    createPostResponse
} from "@solana/actions";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl
} from '@solana/web3.js';
import 'dotenv/config'

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
    return Response.json({
        icon: 'https://picsum.photos/id/69/200',
        title: 'Donate to MiladyBuilder',
        desscription: 'Support MiladyBuilder by donating SOL.',
        label: 'Donate',
        links: {
            actions: [
                {
                    label: 'Donate 0.1 SOL',
                    href: `${url.href}?amount=0.1`
                }, {
                    label: 'Donate SOL',
                    href: `${url.href}?amount={amount}`,
                    parameters: [
                        {
                            name: 'amount',
                            label: 'Amount (SOL)',
                            required: true
                        }
                    ]
                }
            ]
        }
    }, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
    const body = await request.json();
    const amount = Number(url.searchParams.get('amount')) || 0.1;
    let sender;

    try {
        sender = new PublicKey(body.account);
    } catch (error) {
        return Response.json({
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
            body: {
                error: {
                    message: 'Invalid account'
                }
            }
        });
    }

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); // use 'mainnet-beta' in production
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: new PublicKey(process.env.WALLET_PUBLIC_KEY || '6HLSApuzE5e6E3Yiy49V3kM17HeZoGBBmUvsy14ANyje'),
            lamports: amount * LAMPORTS_PER_SOL
        })
    );

    transaction.feePayer = sender;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.lastValidBlockHeight = (await connection.getLatestBlockhash()).lastValidBlockHeight;

    const payload = await createPostResponse({
        fields: {
            transaction,
            message: 'Transaction created'
        }
    });

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    });
}