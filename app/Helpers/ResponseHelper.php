<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;

class ResponseHelper
{
    /**
     * Handle success responses
     */
    public static function success($data, string $message = 'Success', int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Handle error responses
     */
    public static function error(Exception $e, string $customMessage = 'An error occurred', int $status = 500): JsonResponse
    {
        if ($e instanceof ValidationException) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        if ($e instanceof QueryException) {
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => false,
            'message' => $customMessage,
            'error' => $e->getMessage()
        ], $status);
    }
}
