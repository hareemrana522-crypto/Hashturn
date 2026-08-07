import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3002/api/debug/content?slug=full-lifecycle-document-synchronization-sharepoint-assembly';
const pageUrl = 'http://localhost:3002/work/full-lifecycle-document-synchronization-sharepoint-assembly';

for (const url of [apiUrl, pageUrl]) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log('URL:', url);
    console.log('STATUS:', res.status);
    console.log(text.slice(0, 1000));
    console.log('---');
  } catch (err) {
    console.error('ERR', url, err);
  }
}
