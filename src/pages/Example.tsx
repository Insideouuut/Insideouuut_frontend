import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { Link } from 'react-router-dom';

const Example: React.FC = () => {
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        다시 메인으로 돌아가용
      </Link>
      <h1 className="text-3xl font-bold">예시 체크페이지</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>shadcn</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>오잉</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>shadcn</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>오잉</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Example;
