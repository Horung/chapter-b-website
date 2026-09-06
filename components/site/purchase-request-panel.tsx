import { ExternalLink } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const purchaseFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL?.trim() || 'https://forms.gle/8S6GoVM3qC4zy73r9';

export function PurchaseRequestPanel({ title }: { title: string }) {
  return (
    <section className="mt-8 border-t border-border pt-7" aria-labelledby="purchase-request-title">
      <div className="bg-[#f6f3ef] px-5 py-5 sm:px-6">
        <p id="purchase-request-title" className="text-sm font-semibold text-primary">구매 요청 안내</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          『{title}』 구매를 원하시면 구글 폼을 작성해 주세요. 접수 내용을 확인한 뒤 개별 안내드립니다.
        </p>
      </div>
      {purchaseFormUrl ? (
        <a
          href={purchaseFormUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-5 h-12 w-full rounded-none')}
        >
          구글 폼으로 구매 요청 <ExternalLink className="ml-2" />
        </a>
      ) : (
        <div className="mt-5 flex h-12 items-center justify-center border border-[#cfc8c0] bg-[#fbfaf8] text-sm font-medium text-muted-foreground">
          구글 폼 링크 연결 예정
        </div>
      )}
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        결제 및 수령 방법은 요청 내용을 확인한 후 별도로 안내합니다.
      </p>
    </section>
  );
}
