'use client';

interface ApplicationTabProps {
  result: any;
}

export function ApplicationTab({ result }: ApplicationTabProps) {
  return (
    <div className="pl-2 border-l-2 border-green-200">
      {result.common_requirements.eligibility_requirements && (
        <p>
          <span className="text-gray-500 font-medium">资格要求：</span>
          <span className="whitespace-pre-line">
            {result.common_requirements.eligibility_requirements.split(/(?=\d+\.)/).map((item: string, index: number) => (
              <span key={index}>
                {item.trim()}
                {index < result.common_requirements.eligibility_requirements.split(/(?=\d+\.)/).length - 1 && <br />}
              </span>
            ))}
          </span>
        </p>
      )}
      
      {result.common_requirements.required_documents && result.common_requirements.required_documents.length > 0 && (
        <div className="mt-3">
          <span className="text-gray-500 font-medium">所需文件：</span>
          <ul className="list-disc pl-5">
            {result.common_requirements.required_documents.map((doc: string, i: number) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 