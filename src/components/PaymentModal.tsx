import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const wallets = [
  { id: 'usdt-bsc', currency: 'USDT', icon: '💎', network: 'BSC (BEP20)', address: '0x11fffb49cc9c890639882e119798d101fa938a30', color: '#26a17b' },
  { id: 'usdt-trc', currency: 'USDT', icon: '💠', network: 'Tron (TRC20)', address: 'TB48mXmuCKWW8g4abyiKryqUhB9NNFJMN7', color: '#26a17b' },
  { id: 'btc', currency: 'BTC', icon: '₿', network: 'Bitcoin', address: '1LAGffxr17ES8MNoe727h2crx5BKy3CeLB', color: '#f7931a' },
  { id: 'eth', currency: 'ETH', icon: 'Ξ', network: 'Ethereum (ERC20)', address: '0x11fffb49cc9c890639882e119798d101fa938a30', color: '#627eea' },
];

const PaymentModal: React.FC = () => {
  const { t, rtl, paymentModalOpen, setPaymentModalOpen } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!paymentModalOpen) return null;

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-[400] backdrop-blur-sm" onClick={() => setPaymentModalOpen(false)} />
      <div className="fixed inset-3 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[500px] sm:max-h-[85vh] bg-black z-[401] rounded-xl border border-neon-gold/30 overflow-y-auto fade-in" style={{ direction: rtl ? 'rtl' : 'ltr' }}>
        <div className="flex items-center justify-between p-4 border-b border-neon-gold/15 sticky top-0 bg-black z-10">
          <h2 className="text-sm font-bold text-neon-gold">💳 {t('payment_methods')}</h2>
          <button onClick={() => setPaymentModalOpen(false)} className="w-7 h-7 rounded bg-neon-red/10 border border-neon-red/20 text-neon-red text-sm flex items-center justify-center hover:bg-neon-red/20">✕</button>
        </div>
        <div className="p-4 space-y-3">
          {/* Currency badges */}
          <div className="flex justify-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{background:'#26a17b18',color:'#26a17b',border:'1px solid #26a17b33'}}>USDT</span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{background:'#f7931a18',color:'#f7931a',border:'1px solid #f7931a33'}}>Bitcoin</span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{background:'#627eea18',color:'#627eea',border:'1px solid #627eea33'}}>Ethereum</span>
          </div>

          {/* Wallet cards */}
          {wallets.map(w => (
            <div key={w.id} className="p-3 rounded-lg bg-dark-card relative overflow-hidden" style={{ border: `1px solid ${w.color}20` }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: w.color }} />
              <div className="flex items-center gap-2 mb-2 mt-1">
                <span className="text-lg">{w.icon}</span>
                <span className="text-xs font-black text-white">{w.currency}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-auto" style={{ background: `${w.color}15`, color: w.color, border: `1px solid ${w.color}30` }}>{w.network}</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="wallet-address flex-1 text-[10px] text-gray-400 bg-black/50 px-2 py-1.5 rounded font-mono break-all border border-gray-800/50" style={{ userSelect: 'text' }}>{w.address}</code>
                <button onClick={() => handleCopy(w.address, w.id)} className={`px-2.5 py-1.5 rounded text-[10px] font-bold transition-all ${copiedId === w.id ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>{copiedId === w.id ? '✓' : t('copy')}</button>
              </div>
            </div>
          ))}

          {/* Order Instructions */}
          <div className="rounded-lg bg-dark-card p-3 border border-neon-blue/10">
            <h4 className="text-[11px] font-black text-neon-blue mb-1.5">📝 {rtl ? 'تعليمات إتمام الطلب' : 'Order Completion Instructions'}</h4>
            <p className="text-[10px] text-gray-400 leading-[1.7]">{rtl ? 'بعد الدفع، قم بإرسال دليل الدفع (Transaction ID/Hash) لأحد مسؤولي الموقع عبر القنوات الرسمية، وسيتم إرسال الطلب إليك تلقائياً ✨' : 'After payment, send proof (Transaction ID/Hash) to a site manager via official channels, and your order will be sent automatically ✨'}</p>
          </div>

          {/* Service Features */}
          <div className="rounded-lg bg-dark-card p-3 border border-neon-green/10">
            <h4 className="text-[11px] font-black text-neon-green mb-1.5">🛡️ {rtl ? 'المميزات المرفقة مع الخدمة' : 'Service Features'}</h4>
            <div className="space-y-1">
              {(rtl ? [
                'طرق الحماية والتشفير المتقدمة: تأمين العمليات بأحدث أساليب التشفير',
                'ربط البطاقات والحقن: شرح آليات الربط عبر جميع بوابات الدفع العالمية',
                'بوابات الدفع الذكية: شروحات احترافية خاصة بـ Apple Pay و Google Play',
                'تجاوز الأنظمة: طرق تخطي الحماية والحقن المباشر لضمان نجاح العملية',
              ] : [
                'Advanced encryption: Securing operations with latest methods',
                'Card linking & injection: Via all global payment gateways',
                'Smart payment gateways: Apple Pay & Google Play tutorials',
                'System bypass: Protection bypass methods for operation success',
              ]).map((f, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-gray-400 p-1"><span className="text-neon-green">✓</span>{f}</div>
              ))}
            </div>
          </div>

          {/* Contact Manager */}
          <a href="http://t.me/custour?direct" target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 bg-neon-red/10 border border-neon-red/20 rounded-lg text-center text-neon-red font-bold text-xs">
            💬 {rtl ? 'توجه للمسؤول لإتمام الطلب' : 'Contact Manager to Complete Order'}
          </a>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
