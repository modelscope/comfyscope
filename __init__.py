from .nodes.dashscope_flux_api import DashscopeFLUXAPI


NODE_CLASS_MAPPINGS = {
    "DashscopeFLUXAPI": DashscopeFLUXAPI,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DashscopeFLUXAPI": "FLUX API",
}
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
