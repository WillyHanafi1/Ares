import { verifyRecaptcha } from '../recaptcha';

// Mock fetch globally
global.fetch = jest.fn();

describe('verifyRecaptcha', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should return true for valid token with high score', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                score: 0.9,
            }),
        });

        const result = await verifyRecaptcha('valid-token');

        expect(result).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://www.google.com/recaptcha/api/siteverify',
            expect.objectContaining({
                method: 'POST',
            })
        );
    });

    it('should return false for invalid token', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: false,
                'error-codes': ['invalid-input-response'],
            }),
        });

        const result = await verifyRecaptcha('invalid-token');

        expect(result).toBe(false);
    });

    it('should return false for low score', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                score: 0.2, // Low score indicating bot
            }),
        });

        const result = await verifyRecaptcha('low-score-token');

        expect(result).toBe(false);
    });

    it('should return false when API response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Internal Server Error',
        });

        const result = await verifyRecaptcha('error-token');

        expect(result).toBe(false);
    });

    it('should return false when fetch throws an error', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const result = await verifyRecaptcha('error-token');

        expect(result).toBe(false);
    });

    it('should return false for empty token', async () => {
        const result = await verifyRecaptcha('');

        expect(result).toBe(false);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should send correct parameters to Google API', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                score: 0.9,
            }),
        });

        await verifyRecaptcha('test-token');

        expect(global.fetch).toHaveBeenCalledWith(
            'https://www.google.com/recaptcha/api/siteverify',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        );
    });

    it('should return true for score exactly at threshold (0.5)', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                score: 0.5, // Exactly at threshold
            }),
        });

        const result = await verifyRecaptcha('threshold-token');

        expect(result).toBe(true);
    });
});
