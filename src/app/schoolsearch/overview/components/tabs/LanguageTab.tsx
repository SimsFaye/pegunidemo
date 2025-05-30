'use client';

interface LanguageTabProps {
  result: any;
}

export function LanguageTab({ result }: LanguageTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* 英语要求 */}
      {result.common_requirements.english_requirements && (
        <div className="pl-2 border-l-2 border-yellow-200">
          <p className="text-gray-500 font-medium mb-2">英语要求：</p>
          <div className="ml-3">
            <p className="text-sm">
              <span className="text-gray-500">是否必须：</span>
              <span>{result.common_requirements.english_requirements.required ? '是' : '否'}</span>
            </p>
            {result.common_requirements.english_requirements.tests && result.common_requirements.english_requirements.tests.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">接受的考试：</p>
                <ul className="list-disc pl-5">
                  {result.common_requirements.english_requirements.tests.map((test: any, i: number) => (
                    <li key={i} className="text-sm">
                      {test.test_type} 
                      {test.minimum_score && <span> (最低分数: {test.minimum_score})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.common_requirements.english_requirements.exemption_conditions && (
              <p className="text-sm mt-2">
                <span className="text-gray-500">豁免条件：</span>
                <span>{result.common_requirements.english_requirements.exemption_conditions}</span>
              </p>
            )}
            {result.common_requirements.english_requirements.notes && (
              <p className="text-sm mt-2">
                <span className="text-gray-500">备注：</span>
                <span>{result.common_requirements.english_requirements.notes}</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* 日语要求 */}
      {result.common_requirements.japanese_requirements && (
        <div className="pl-2 border-l-2 border-red-200">
          <p className="text-gray-500 font-medium mb-2">日语要求：</p>
          <div className="ml-3">
            <p className="text-sm">
              <span className="text-gray-500">是否必须：</span>
              <span>{result.common_requirements.japanese_requirements.required ? '是' : '否'}</span>
            </p>
            {result.common_requirements.japanese_requirements.tests && result.common_requirements.japanese_requirements.tests.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">接受的考试：</p>
                <ul className="list-disc pl-5">
                  {result.common_requirements.japanese_requirements.tests.map((test: any, i: number) => (
                    <li key={i} className="text-sm">
                      {test.test_type} 
                      {test.minimum_score && <span> (最低分数: {test.minimum_score})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.common_requirements.japanese_requirements.exemption_conditions && (
              <p className="text-sm mt-2">
                <span className="text-gray-500">豁免条件：</span>
                <span>{result.common_requirements.japanese_requirements.exemption_conditions}</span>
              </p>
            )}
            {result.common_requirements.japanese_requirements.notes && (
              <p className="text-sm mt-2">
                <span className="text-gray-500">备注：</span>
                <span>{result.common_requirements.japanese_requirements.notes}</span>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* 一般语言备注 */}
      {result.common_requirements.language_notes && (
        <div className="pl-2 border-l-2 border-purple-200">
          <p className="text-gray-500 font-medium mb-2">语言备注：</p>
          <p className="text-sm ml-3">{result.common_requirements.language_notes}</p>
        </div>
      )}
      
      {/* 其他可选语言 */}
      {result.common_requirements.alternative_exam_languages && result.common_requirements.alternative_exam_languages.length > 0 && (
        <div className="pl-2 border-l-2 border-blue-200">
          <p className="text-gray-500 font-medium mb-2">其他可选语言：</p>
          <div className="ml-3 flex flex-wrap gap-2">
            {result.common_requirements.alternative_exam_languages.map((lang: string, i: number) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 