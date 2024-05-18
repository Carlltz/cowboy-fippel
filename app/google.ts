'use server';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    keyFilename: 'google-service-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function loadSpreadsheet() {
    const sheets = google.sheets({ version: 'v4', auth: auth });

    const response = (
        await sheets.spreadsheets.values.get({
            spreadsheetId: '1FPGJa_7V9KcOAIHX1H0_BVdy1OYIvkib_8wcL3VAmZA',
            range: `Ändringar!A2:C500`,
        })
    ).data;
    return response;
}

export async function formatResponse(values: [[string, string]]) {
    return values
        .map(([name, score]) => ({ name, score: isNaN(parseInt(score)) ? 0 : parseInt(score) }))
        .sort((a, b) => b.score - a.score);
}

export async function getTopList() {
    const data = await loadSpreadsheet();
    const sortedData = await formatResponse(data.values as [[string, string]]);

    return sortedData;
}
