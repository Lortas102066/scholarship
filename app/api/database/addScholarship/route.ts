import dbConnect from '@/utils/database';
import Scholarship from '@/models/scholarship';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const data = await request.json();
    const {
      name,
      provider,
      desc,
      link,
      application_start_date,
      application_end_date,
      combination,
      isAbroad,
      isGranted,
      capacity,
      amounts, // この行を追加
      conditions // この行を追加
    } = data;
    
    const parsedStartDate = new Date(application_start_date.$date);
    const parsedEndDate = new Date(application_end_date.$date);

    const newScholarship = new Scholarship({
      name,
      provider,
      desc,
      link,
      application_start_date: parsedStartDate,
      application_end_date: parsedEndDate,
      combination,
      isAbroad,
      isGranted,
      capacity,
      amounts, 
      conditions 
    });

    const savedScholarship = await newScholarship.save();

    return new Response(JSON.stringify(savedScholarship), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: 'Failed to save scholarship',
        message: (error as Error).message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
