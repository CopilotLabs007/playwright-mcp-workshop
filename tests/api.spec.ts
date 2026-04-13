import { expect, test } from '@playwright/test';

test.describe('GET /api/facts', () => {
  test('returns a fact for a valid topic and index', async ({ request }) => {
    const response = await request.get('/api/facts?topic=alphabet&index=0');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.topic).toBe('alphabet');
    expect(body.index).toBe(0);
    expect(body.totalFacts).toBeGreaterThan(0);
    expect(typeof body.fact).toBe('string');
    expect(body.fact.length).toBeGreaterThan(0);
  });

  test('defaults to topic=alphabet and index=0 when query params are omitted', async ({ request }) => {
    const response = await request.get('/api/facts');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.topic).toBe('alphabet');
    expect(body.index).toBe(0);
  });

  test('returns a different fact for index=1', async ({ request }) => {
    const first = await (await request.get('/api/facts?topic=alphabet&index=0')).json();
    const second = await (await request.get('/api/facts?topic=alphabet&index=1')).json();

    expect(second.index).toBe(1);
    expect(second.fact).not.toBe(first.fact);
  });

  test('wraps the index when it equals totalFacts', async ({ request }) => {
    const first = await (await request.get('/api/facts?topic=alphabet&index=0')).json();
    const { totalFacts } = first;

    const wrapped = await (
      await request.get(`/api/facts?topic=alphabet&index=${totalFacts}`)
    ).json();

    expect(wrapped.index).toBe(0);
    expect(wrapped.fact).toBe(first.fact);
  });

  test('returns facts for every valid topic', async ({ request }) => {
    const topics = ['alphabet', 'numbers', 'colors', 'shapes', 'animals', 'playground', 'quiz'];

    for (const topic of topics) {
      const response = await request.get(`/api/facts?topic=${topic}&index=0`);

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.topic).toBe(topic);
      expect(typeof body.fact).toBe('string');
    }
  });

  test('returns 400 for an invalid topic', async ({ request }) => {
    const response = await request.get('/api/facts?topic=invalid-topic&index=0');

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Invalid topic selected.');
  });

  test('returns 400 for a negative index', async ({ request }) => {
    const response = await request.get('/api/facts?topic=alphabet&index=-1');

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Invalid fact index.');
  });

  test('returns 400 for a non-numeric index', async ({ request }) => {
    const response = await request.get('/api/facts?topic=alphabet&index=abc');

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Invalid fact index.');
  });
});
