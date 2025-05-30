'use client';

interface DocumentsTabProps {
  result: any;
}

export function DocumentsTab({ result }: DocumentsTabProps) {
  return (
    <div className="pl-2 border-l-2 border-blue-200">
      {/* 研究计划书要求 */}
      {(result.common_requirements.research_plan_length_japanese || result.common_requirements.research_plan_length_english) && (
        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">研究计划书要求：</p>
          <div className="ml-3 space-y-3">
            {result.common_requirements.research_plan_length_japanese && (
              <div className="mb-2">
                {(result.common_requirements.research_plan_length_japanese.value || 
                  result.common_requirements.research_plan_length_japanese.format_notes) && (
                  <>
                    <p className="text-sm">
                      <span className="text-gray-500">语言：</span>
                      <span>日语</span>
                    </p>
                    {result.common_requirements.research_plan_length_japanese.value && result.common_requirements.research_plan_length_japanese.unit && (
                      <p className="text-sm">
                        <span className="text-gray-500">长度要求：</span>
                        <span>{result.common_requirements.research_plan_length_japanese.value} {result.common_requirements.research_plan_length_japanese.unit === 'words' ? '字' : '页'}</span>
                      </p>
                    )}
                    {result.common_requirements.research_plan_length_japanese.format_notes && (
                      <p className="text-sm">
                        <span className="text-gray-500">格式说明：</span>
                        <span>{result.common_requirements.research_plan_length_japanese.format_notes}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
            
            {result.common_requirements.research_plan_length_english && (
              <div>
                {(result.common_requirements.research_plan_length_english.value || 
                  result.common_requirements.research_plan_length_english.format_notes) && (
                  <>
                    <p className="text-sm">
                      <span className="text-gray-500">语言：</span>
                      <span>英语</span>
                    </p>
                    {result.common_requirements.research_plan_length_english.value && result.common_requirements.research_plan_length_english.unit && (
                      <p className="text-sm">
                        <span className="text-gray-500">长度要求：</span>
                        <span>{result.common_requirements.research_plan_length_english.value} {result.common_requirements.research_plan_length_english.unit === 'words' ? 'words' : 'pages'}</span>
                      </p>
                    )}
                    {result.common_requirements.research_plan_length_english.format_notes && (
                      <p className="text-sm">
                        <span className="text-gray-500">格式说明：</span>
                        <span>{result.common_requirements.research_plan_length_english.format_notes}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 推荐信要求 */}
      {result.common_requirements.recommendation_letter_details && (
        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">推荐信要求：</p>
          <div className="ml-3">
            {result.common_requirements.recommendation_letter_details.required_count !== null && (
              <p className="text-sm">
                <span className="text-gray-500">所需数量：</span>
                <span>{result.common_requirements.recommendation_letter_details.required_count} 份</span>
              </p>
            )}
            {result.common_requirements.recommendation_letter_details.recommender_qualifications && (
              <p className="text-sm">
                <span className="text-gray-500">推荐人资格：</span>
                <span>{result.common_requirements.recommendation_letter_details.recommender_qualifications}</span>
              </p>
            )}
            {result.common_requirements.recommendation_letter_details.submission_method && (
              <p className="text-sm">
                <span className="text-gray-500">提交方式：</span>
                <span>{result.common_requirements.recommendation_letter_details.submission_method}</span>
              </p>
            )}
            {result.common_requirements.recommendation_letter_details.notes && (
              <p className="text-sm">
                <span className="text-gray-500">备注：</span>
                <span>{result.common_requirements.recommendation_letter_details.notes}</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* 教授联系要求 */}
      {result.common_requirements.professor_contact_required !== null && (
        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">教授联系要求：</p>
          <div className="ml-3">
            <p className="text-sm">
              <span className="text-gray-500">是否需要联系：</span>
              <span>{result.common_requirements.professor_contact_required ? '是' : '否'}</span>
            </p>
            {result.common_requirements.professor_contact_details && (
              <p className="text-sm mt-1">
                <span className="text-gray-500">详细说明：</span>
                <span>{result.common_requirements.professor_contact_details}</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* 工作经历要求 */}
      {result.common_requirements.work_history_requirement_status && (
        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">工作经历要求：</p>
          <div className="ml-3">
            <p className="text-sm">
              <span className="text-gray-500">要求状态：</span>
              <span>{result.common_requirements.work_history_requirement_status}</span>
            </p>
            {result.common_requirements.work_history_details && (
              <p className="text-sm mt-1">
                <span className="text-gray-500">详细说明：</span>
                <span>{result.common_requirements.work_history_details}</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* 参考作品要求 */}
      {result.common_requirements.reference_works_required !== null && (
        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">参考作品要求：</p>
          <div className="ml-3">
            <p className="text-sm">
              <span className="text-gray-500">是否需要提交：</span>
              <span>{result.common_requirements.reference_works_required ? '是' : '否'}</span>
            </p>
            {result.common_requirements.reference_works_details && (
              <p className="text-sm mt-1">
                <span className="text-gray-500">详细说明：</span>
                <span>{result.common_requirements.reference_works_details}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 