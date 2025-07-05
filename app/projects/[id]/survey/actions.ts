'use server';

import { db } from '@/lib/db/queries';
import { surveyResponses } from '@/lib/db/schema';
import { nanoid } from 'nanoid';

interface SaveSurveyResponseProps {
  projectId: string;
  teamMemberName: string;
  responseContent: string;
}

export async function saveSurveyResponse({
  projectId,
  teamMemberName,
  responseContent,
}: SaveSurveyResponseProps) {
  try {
    const id = nanoid();
    await db.insert(surveyResponses).values({
      id,
      projectId,
      teamMemberName,
      responseContent,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to save survey response:', error);
    return { success: false, error: '설문 응답 저장에 실패했습니다.' };
  }
}
