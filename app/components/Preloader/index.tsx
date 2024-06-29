import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BackgroundTexture } from '../TextureOverlay';
import { useMiscStore } from '@/app/utils/store/miscStore';
import { GetImage } from '..';

interface PreloaderProps {
    setLoading: (loading: boolean) => void;
}

const Preloader: React.FC<PreloaderProps> = ({ setLoading }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (imageLoaded) setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    return 100;
                }
                const diff = Math.random() * 5;
                return Math.min(oldProgress + diff, 100);
            });
        }, 20);

        return () => {
            clearInterval(interval);
        }
    }, [imageLoaded, setLoading]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
            <BackgroundTexture />
            <div className="flex flex-col gap-vw-4 justify-center items-center">
                <Image
                    src={GetImage("img/logo.avif")}
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="45vw"
                    className="w-auto h-vw-24-min@lg md:h-vw-32-min@xl"
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="w-[65%] lg:h-[15px] md:h-[12px] sm:h-[10px] h-[8px]">
                    <div className="w-full h-full flex flex-row">
                        <div className="w-full h-full flex flex-row">
                            <div className="bg-[#C2C2C2] lg:w-[3px] md:w-[3px] sm:w-[2px] w-[1px] h-[80%]" />
                            <div className="w-full h-full">
                                <div className="bg-[#C2C2C2] w-full lg:h-[3px] md:h-[3px] sm:h-[2px] h-[1px]" />
                                <div
                                    className="bg-[#2AA146] h-[60%]"
                                    style={{ width: `${progress}%` }}
                                ></div>
                                <div className="bg-[#8F8F8F] w-full lg:h-[3px] md:h-[3px] sm:h-[2px] h-[1px] " />
                            </div>
                        </div>
                        <div className="lg:self-end md:self-end bg-[#8F8F8F] lg:w-[3px] md:w-[3px] sm:w-[2px] w-[1px]  h-[80%]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
