'use server';

import { db } from '@/lib/db/queries';
import { surveyResponses } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';

export async function saveSurveyResponseAction(
  projectId: string,
  data: { teamMemberName: string; responseContent: string },
) {
  const { teamMemberName, responseContent } = data;

  if (!teamMemberName || !responseContent) {
    throw new Error('이름과 응답 내용은 필수입니다.');
  }

  const id = nanoid();
  await db.insert(surveyResponses).values({
    id,
    projectId,
    teamMemberName,
    responseContent,
  });

  revalidatePath(`/projects/${projectId}/dashboard`);
}
