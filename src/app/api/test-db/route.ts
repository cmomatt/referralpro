import { NextResponse } from 'next/server';
import { testDatabaseConnection, createTestData, clearTestData } from '@/lib/test-db';

export async function GET() {
  try {
    const connectionTest = await testDatabaseConnection();

    if (!connectionTest.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database connection test failed',
          error: connectionTest.error,
          results: connectionTest.results
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection and schema test successful!',
      results: connectionTest.results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database test error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const testDataResult = await createTestData();

    if (!testDataResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create test data',
          error: testDataResult.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test data created successfully!',
      data: testDataResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test data creation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Test data creation error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const clearResult = await clearTestData();

    if (!clearResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to clear test data',
          error: clearResult.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test data cleared successfully!',
      deletedCount: clearResult.deletedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test data clearing error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Test data clearing error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
