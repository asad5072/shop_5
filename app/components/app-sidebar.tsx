"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import logoBlack from "@/public/globe.svg";
import logoWhite from "@/public/file.svg";
import { Button } from "@/components/ui/button";
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import admnSidebarMenu from "@/lib/admin/adminSidebarMenu";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Link from "next/link";

export function AppSidebar() {
	return (
		<Sidebar>
			{/* HEADER */}
			<SidebarHeader>
				<div className="flex items-center justify-between">
					<Image
						src={logoBlack}
						alt="Logo dark"
						width={40}
						height={40}
						className="dark:hidden block"
					/>
					<Image
						src={logoWhite}
						alt="Logo white"
						width={40}
						height={40}
						className="hidden dark:block"
					/>

					<Button type="button" size="icon" className="md:hidden">
						<IoMdClose size={20} />
					</Button>
				</div>
			</SidebarHeader>

			{/* CONTENT */}
			<SidebarContent>
				<SidebarMenu>
					{admnSidebarMenu.map((menu) => {
						const { icon: Icon, submenu } = menu;

						// 👉 যদি submenu না থাকে
						if (!submenu || submenu.length === 0) {
							return (
								<SidebarMenuItem key={menu.title}>
									<SidebarMenuButton asChild>
										<Link
											href={menu.url || "#"}
											className="flex items-center gap-2"
										>
											{Icon && <Icon className="w-5 h-5" />}
											<span>{menu.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						}

						// 👉 submenu থাকলে collapsible
						return (
							<Collapsible key={menu.title} className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton asChild>
											<div className="flex items-center gap-2 w-full cursor-pointer">
												{Icon && <Icon className="w-5 h-5" />}
												<span>{menu.title}</span>

												<LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</div>
										</SidebarMenuButton>
									</CollapsibleTrigger>
								</SidebarMenuItem>

								{/* SUBMENU */}
								<CollapsibleContent>
									<div className="ml-6 mt-1 space-y-1">
										{submenu.map((sub) => {
											const SubIcon = sub.icon;

											return (
												<Link
													key={sub.title}
													href={sub.url || "#"}
													className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
												>
													{SubIcon && <SubIcon className="w-4 h-4" />}
													<span>{sub.title}</span>
												</Link>
											);
										})}
									</div>
								</CollapsibleContent>
							</Collapsible>
						);
					})}
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter />
		</Sidebar>
	);
}
